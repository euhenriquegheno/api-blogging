export declare const usuarioSchema: {
    type: string;
    properties: {
        id: {
            type: string;
        };
        email: {
            type: string;
        };
        nome: {
            type: string;
        };
        cpf: {
            type: string;
        };
        tipo: {
            type: string;
        };
    };
};
export declare const publicacaoSchema: {
    type: string;
    properties: {
        id: {
            type: string;
            description: string;
        };
        titulo: {
            type: string;
        };
        conteudo: {
            type: string;
        };
        usuario: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                email: {
                    type: string;
                };
                nome: {
                    type: string;
                };
                cpf: {
                    type: string;
                };
                tipo: {
                    type: string;
                };
            };
        };
    };
};
export declare const publicacaoBodySchema: {
    type: string;
    required: string[];
    properties: {
        titulo: {
            type: string;
        };
        conteudo: {
            type: string;
        };
        usuario_id: {
            type: string;
            description: string;
        };
    };
};
export declare const usuarioBodySchema: {
    type: string;
    required: string[];
    properties: {
        email: {
            type: string;
        };
        senha: {
            type: string;
            format: string;
        };
        nome: {
            type: string;
        };
        cpf: {
            type: string;
        };
        tipo: {
            type: string;
        };
    };
};
//# sourceMappingURL=swagger-schemas.d.ts.map