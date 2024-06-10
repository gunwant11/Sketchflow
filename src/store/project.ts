import { create } from 'zustand';
import { UserStore } from './user';

// const [canvas, setCanvas] = useState<fabric.Canvas>();
// const [layers, setLayers] = useState<Layer[]>([])

interface ProjectStore {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    fetchProjects: (userId: string) => void;
    createProject: () => void;
    deleteProject: (projectId: string) => void;
    updateProject: (projectId: string, title: string, layers: string, thumbnail: string) => void;
    canvas: fabric.Canvas | null;
    setCanvas: (canvas: fabric.Canvas) => void;
    layers: Layer[];
    setLayers: (layers: Layer[]) => void;
    title: string;
    setTitle: (title: string) => void;
}


export const ProjectStore = create<ProjectStore>((set, get) => ({
    projects: [],
    setTitle: (title) => set({ title }),
    title: 'New Project',
    setProjects: (projects) => set({ projects }),
    fetchProjects: async (userId) => {
        // fetch projects
        try {
            const projects = await fetch(`/api/project?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await projects.json();
            set({ projects: data.projects });
            console.log('data.projects', data.projects);
        }
        catch (error) {
            console.error(error);
        }
    },
    createProject: async () => {
        // create project
        try {
            const userId = UserStore.getState().user?.id;
            const project = await fetch(`/api/project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            const data = await project.json();
            const projects = get().projects;
            set({ projects: [...projects, data.project] });
            return data.project;
        }
        catch (error) {
            console.error(error);
        }
    },
    deleteProject: async (projectId) => {
        // delete project
        try {
            const deletedProject = await fetch(`/api/projectId`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectId }),
            });
            const data = await deletedProject.json();
            const projects = get().projects;
            set({ projects: projects.filter((project) => project.id !== data.projectId) });
            return data.projectId;
        }
        catch (error) {
            console.error(error);
        }
    },
    updateProject: async (projectId, title, layers, thumbnail) => {
        try {
            const updatedProject = await fetch(`/api/projectId`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectId, title, layers, thumbnail }),
            });
            await updatedProject.json();

        }
        catch (error) {
            console.error(error);
        }
    },
    canvas: null,
    setCanvas: (canvas) => set({ canvas }),
    layers: [],
    setLayers: (layers) => set({ layers }),
}));