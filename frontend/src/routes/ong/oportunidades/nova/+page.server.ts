import {
	backendRequest,
	BackendHttpError,
	dateTimeFromDateInput,
	formValue,
	requireRole
} from '$lib/server/backend';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	try {
		const sessao = await requireRole(locals, url, ['ong']);

		if (sessao.perfil?.status_analise !== 'aprovado') {
			return {
				bloqueio: 'ONG precisa estar aprovada para criar oportunidades.'
			};
		}

		return { bloqueio: null };
	} catch (error) {
		if (error instanceof BackendHttpError) {
			return { bloqueio: error.message };
		}

		throw error;
	}
}

export const actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData();
		const valores = valuesFromForm(formData);

		try {
			await backendRequest(locals, '/oportunidades', {
				method: 'POST',
				body: buildPayload(valores)
			});
		} catch (error) {
			if (error instanceof BackendHttpError) {
				return fail(error.status, { ...valores, erro: error.message });
			}

			return fail(500, { ...valores, erro: 'Nao foi possivel criar a oportunidade.' });
		}

		redirect(303, '/ong/oportunidades');
	}
};

function valuesFromForm(formData: FormData) {
	return {
		titulo: formValue(formData, 'titulo'),
		descricao: formValue(formData, 'descricao'),
		tipoAtividade: formValue(formData, 'tipoAtividade'),
		cidade: formValue(formData, 'cidade'),
		estado: formValue(formData, 'estado'),
		dataInicio: formValue(formData, 'dataInicio'),
		dataFim: formValue(formData, 'dataFim'),
		prazoInscricao: formValue(formData, 'prazoInscricao'),
		quantidadeVagas: formValue(formData, 'quantidadeVagas'),
		status: formValue(formData, 'status') || 'publicada'
	};
}

function buildPayload(values: ReturnType<typeof valuesFromForm>) {
	return {
		titulo: values.titulo,
		descricao: values.descricao,
		tipoAtividade: values.tipoAtividade,
		cidade: values.cidade,
		estado: values.estado,
		dataInicio: dateTimeFromDateInput(values.dataInicio),
		dataFim: dateTimeFromDateInput(values.dataFim, true),
		prazoInscricao: dateTimeFromDateInput(values.prazoInscricao, true),
		quantidadeVagas: Number(values.quantidadeVagas),
		status: values.status
	};
}
