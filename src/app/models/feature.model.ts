export interface Feature{
    id: string;
    name: string;
    description: string;
    priority: number;
    projectId: string;
    ownerId: string;
    status: "todo" | "doing" | "done"
}