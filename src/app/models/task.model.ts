export interface Task{
    id: string;
    name: string;
    description: string;
    priority: number;
    featureId: string;
    projectId: string;
    expectedWorkTime?: number;
    status: "todo" | "doing" | "done"
    created: Date;
    started?: Date;
    ended?: Date;
    assignedUserId?: string;
    createdById: string;
}