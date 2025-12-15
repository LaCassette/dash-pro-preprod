'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { ExerciseProgramBuilder } from '@/components/dashboard/exercise-program-builder';

export default function ProgramBuilderPage() {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                    <h1 className="text-2xl font-bold">Créer un Programme</h1>
                    <p className="text-muted-foreground">
                        Construisez un programme sportif à partir de la bibliothèque d'exercices
                    </p>
                </div>
            </div>

            <ExerciseProgramBuilder />
        </div>
    );
}
