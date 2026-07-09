import { IPublicacao } from '../entities/models/publicacao.interface';
import { IPublicacaoRepository } from '../repositories/publicacao.repository.interface';
export declare class UpdatePublicacaoUseCase {
    private publicacaoRepository;
    constructor(publicacaoRepository: IPublicacaoRepository);
    handler(id: string, publicacaoNew: IPublicacao): Promise<IPublicacao>;
}
//# sourceMappingURL=update-publicacao.d.ts.map