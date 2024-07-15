import { create } from 'zustand';
import { UserStore } from './user';
import { Team } from '@prisma/client';

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
    dashboardLoading: boolean;
    setDashboardLoading: (loading: boolean) => void;
    projectLoading: boolean;
    setProjectLoading: (loading: boolean) => void;
    teams: Team[];
    setTeams: (teams: Team[]) => void;
    fetchTeams: (userId: string) => void;
    selectedTeam: Team | null;
    setSelectedTeam: (team: Team) => void;
    drawerTab: string;
    setDrawerTab: (tab: string) => void;
}


export const ProjectStore = create<ProjectStore>((set, get) => ({
    projects: [],
    setTitle: (title) => set({ title }),
    dashboardLoading: true,
    setDashboardLoading: (loading) => set({ dashboardLoading: loading }),
    title: 'New Project',
    setProjects: (projects) => set({ projects }),
    projectLoading: false,
    setProjectLoading: (loading) => set({ projectLoading: loading }),
    fetchProjects: async (userId) => {
        // fetch projects
        try {
            set({ dashboardLoading: true });
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
        finally {
            set({ dashboardLoading: false });
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
                body: JSON.stringify({ userId, teamId: get().selectedTeam?.id }),
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
    teams: [],
    setTeams: (teams) => set({ teams }),
    fetchTeams: async (userId) => {
        try {
            const teams = await fetch(`/api/team?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await teams.json();
            set({ teams: data.teams, selectedTeam: data.teams[0] });

        }
        catch (error) {
            console.error(error);
        }
    },
    selectedTeam: null,
    setSelectedTeam: (team) => set({ selectedTeam: team }),
    drawerTab: 'teams',
    setDrawerTab: (tab) => set({ drawerTab: tab }),
}));