import { getPostBySlug } from '$lib/posts';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const post = getPostBySlug(params.slug);

	if (!post || !post.contenido) {
		throw error(404, 'Post no encontrado');
	}

	return { post };
}
