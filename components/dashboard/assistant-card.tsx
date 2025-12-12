'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bot, MessageSquare, MoreVertical, Edit, Trash2, Copy, History } from 'lucide-react';
import { specialtyNames, specialtyColors, AgentSpecialty } from '@/lib/default-agents';

interface AssistantCardProps {
    agent: {
        id: string;
        name: string;
        image: string | null;
        context: string | null;
        _count: {
            sessions: number;
        };
    };
    onChat: (agentId: string) => void;
    onHistory?: (agentId: string) => void;
    onEdit?: (agentId: string) => void;
    onDelete?: (agentId: string) => void;
    onDuplicate?: (agentId: string) => void;
}

// Detect specialty from agent context or name
function detectSpecialty(name: string, context: string | null): AgentSpecialty | null {
    const text = `${name} ${context || ''}`.toLowerCase();

    if (text.includes('yoga') || text.includes('méditation')) return 'YOGA';
    if (text.includes('kiné') || text.includes('rééducation') || text.includes('blessure')) return 'KINESITHERAPY';
    if (text.includes('mental') || text.includes('psycho')) return 'MENTAL';
    if (text.includes('musculation') || text.includes('force') || text.includes('masse')) return 'STRENGTH';
    if (text.includes('pilates') || text.includes('core') || text.includes('postur')) return 'PILATES';
    if (text.includes('running') || text.includes('course') || text.includes('marathon') || text.includes('endurance')) return 'RUNNING';
    if (text.includes('programme') || text.includes('personnalisé') || text.includes('coach sportif')) return 'PROGRAM_DESIGN';
    if (text.includes('cardio') || text.includes('hiit') || text.includes('fitness')) return 'CARDIO';
    if (text.includes('combat') || text.includes('boxe') || text.includes('frappe')) return 'COMBAT';
    if (text.includes('nutrition') || text.includes('alimenta') || text.includes('repas')) return 'NUTRITION';

    return null;
}

export function AssistantCard({
    agent,
    onChat,
    onHistory,
    onEdit,
    onDelete,
    onDuplicate,
}: AssistantCardProps) {
    const specialty = detectSpecialty(agent.name, agent.context);
    const specialtyColor = specialty ? specialtyColors[specialty] : '#6b7280';
    const specialtyLabel = specialty ? specialtyNames[specialty] : 'Assistant IA';

    return (
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] hover:border-primary/50">
            {/* Colored top border based on specialty */}
            <div
                className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
                style={{ backgroundColor: specialtyColor }}
            />

            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 text-2xl">
                            <AvatarFallback
                                className="text-xl"
                                style={{ backgroundColor: `${specialtyColor}20`, color: specialtyColor }}
                            >
                                {agent.image || <Bot className="h-6 w-6" />}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                                {agent.name}
                            </CardTitle>
                            <Badge
                                variant="secondary"
                                className="mt-1 text-xs font-medium"
                                style={{
                                    backgroundColor: `${specialtyColor}15`,
                                    color: specialtyColor,
                                    borderColor: `${specialtyColor}30`,
                                }}
                            >
                                {specialtyLabel}
                            </Badge>
                        </div>
                    </div>

                    {(onEdit || onDelete || onDuplicate) && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {onEdit && (
                                    <DropdownMenuItem onClick={() => onEdit(agent.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Modifier
                                    </DropdownMenuItem>
                                )}
                                {onDuplicate && (
                                    <DropdownMenuItem onClick={() => onDuplicate(agent.id)}>
                                        <Copy className="mr-2 h-4 w-4" />
                                        Dupliquer
                                    </DropdownMenuItem>
                                )}
                                {onDelete && (
                                    <DropdownMenuItem
                                        onClick={() => onDelete(agent.id)}
                                        className="text-destructive focus:text-destructive"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Supprimer
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                <CardDescription className="line-clamp-2 mt-2">
                    {agent.context || 'Assistant IA personnalisé'}
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span>
                            {agent._count.sessions} session{agent._count.sessions !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {onHistory && agent._count.sessions > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => onHistory(agent.id)}
                        >
                            <History className="mr-1 h-3 w-3" />
                            Historique
                        </Button>
                    )}
                </div>

                <Button
                    className="w-full"
                    onClick={() => onChat(agent.id)}
                    style={{
                        backgroundColor: specialtyColor,
                        color: 'white',
                    }}
                >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chatter avec {agent.name}
                </Button>
            </CardContent>
        </Card>
    );
}
