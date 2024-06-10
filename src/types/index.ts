
interface User {
    id: number;
    name: string;
    email: string;
    projects: Project[];
}

interface Project {
    id: number;
    title: string;
    layers: Layer[];
}

interface Layer {
    id: number;
    sortOrder: number;
    title: string;
    hidden: boolean;
    locked: boolean;
    canvas: JSON;
}
