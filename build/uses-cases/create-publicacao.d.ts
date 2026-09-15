import { IPublicacao } from '../entities/models/publicacao.interface';
import { IPublicacaoRepository } from '../repositories/publicacao.repository.interface';
export declare class CreatePublicacaoUseCase {
    private publicacaoRepository;
    constructor(publicacaoRepository: IPublicacaoRepository);
    handler(publicacao: IPublicacao): Promise<IPublicacao>;
}
//# sourceMappingURL=create-publicacao.d.ts.map