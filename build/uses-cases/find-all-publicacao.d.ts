import { IPublicacaoRepository } from '../repositories/publicacao.repository.interface';
export declare class FindAllPublicacaoUseCase {
    private publicacaoRepository;
    constructor(publicacaoRepository: IPublicacaoRepository);
    handler(page: number, limit: number): Promise<import("../entities/models/publicacao.interface").IPublicacao[]>;
}
//# sourceMappingURL=find-all-publicacao.d.ts.map