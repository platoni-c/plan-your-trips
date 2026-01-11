export interface Trip {
    name: string;
    destination: string;
    date: string;
    duration: string;
    budget: string;
    status: 'Planning' | 'Upcoming' | 'Completed';
    image?: string;
    description: string;
}
