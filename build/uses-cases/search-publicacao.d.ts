import { IPublicacaoRepository } from '../repositories/publicacao.repository.interface';
export declare class SearchPublicacaoUseCase {
    private publicacaoRepository;
    constructor(publicacaoRepository: IPublicacaoRepository);
    handler(term: string): Promise<import("../entities/models/publicacao.interface").IPublicacao[]>;
}
//# sourceMappingURL=search-publicacao.d.ts.map