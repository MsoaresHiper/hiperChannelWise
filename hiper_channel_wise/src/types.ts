export interface Client {
    id: string;
    name: string;
    cpf: string;
    email: string;
    channels: {
        whatsapp: string;
        sms: string;
        email?: string;
    };
}

export interface Company {
    company: string;
    customers: Client[];
}

export interface ApiData {
    CommunicationChannelAnalysisApi: Company[];
}
