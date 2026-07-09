import { IPublicacaoRepository } from '../repositories/publicacao.repository.interface';
export declare class FindPublicacaoUseCase {
    private publicacaoRepository;
    constructor(publicacaoRepository: IPublicacaoRepository);
    handler(id: string): Promise<import("../entities/models/publicacao.interface").IPublicacao>;
}
//# sourceMappingURL=find-publicacao.d.ts.map