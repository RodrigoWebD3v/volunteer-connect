import { backendRequest } from '$lib/server/backend';
import type { PageServerLoad } from './$types';

type Oportunidade = {
	id: string;
	titulo: string;
	ong?: string | { nomeFantasia?: string | null } | null;
	tipoAtividade: string;
	cidade: string;
	estado: string;
	dataInicio: string;
	quantidadeVagas: number;
	ctaStatus?: string;
};

const fallbackOportunidades: Oportunidade[] = [
	{
		id: '11111111-1111-4111-8111-111111111111',
		titulo: 'Apoio em campanha de alimentos',
		ong: { nomeFantasia: 'Rede Solidaria Local' },
		tipoAtividade: 'Doacoes',
		cidade: 'Criciuma',
		estado: 'SC',
		dataInicio: '2026-06-15T09:00:00.000Z',
		quantidadeVagas: 18,
		ctaStatus: 'inscricao_aberta'
	},
	{
		id: '22222222-2222-4222-8222-222222222222',
		titulo: 'Reforco escolar comunitario',
		ong: { nomeFantasia: 'Instituto Aprender Junto' },
		tipoAtividade: 'Educacao',
		cidade: 'Icara',
		estado: 'SC',
		dataInicio: '2026-06-20T14:00:00.000Z',
		quantidadeVagas: 8,
		ctaStatus: 'inscricao_aberta'
	}
];

export const load: PageServerLoad = async ({ locals, url }) => {
	const query = url.searchParams.toString();

	try {
		return {
			oportunidades: await backendRequest<Oportunidade[]>(
				locals,
				`/oportunidades${query ? `?${query}` : ''}`,
				{
					tokenRequired: false
				}
			),
			offline: false
		};
	} catch {
		// Ambiente academico local pode abrir o frontend antes do backend.
		return {
			oportunidades: fallbackOportunidades,
			offline: true
		};
	}
};
