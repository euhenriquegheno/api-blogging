import { IPublicacaoRepository } from '../repositories/publicacao.repository.interface';
export declare class DeletePublicacaoUseCase {
    private publicacaoRepository;
    constructor(publicacaoRepository: IPublicacaoRepository);
    handler(id: string): Promise<void>;
}
//# sourceMappingURL=delete-publicacao.d.ts.map