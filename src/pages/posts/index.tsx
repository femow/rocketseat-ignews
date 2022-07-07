import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../api/prismic'
import styles from './styles.module.scss'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Link from 'next/link'


type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}
interface PostsProps {
    posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                {
                    posts.map(post => (
                        <Link href={`/posts/${post.slug}`}>
                            <div className={styles.posts} key={post.slug}>
                                <a>
                                    <time>{post.updatedAt}</time>
                                    <strong>{post.title}</strong>
                                    <p>{post.excerpt}</p>
                                </a>
                            </div>
                        </Link>
                    ))
                }
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const primisc = getPrismicClient()
    const response = await primisc.query([
        Prismic.predicates.at('document.type', 'post')
    ], {
        fetch: ['post.title', 'post.content'],
        pageSize: 100,
    })

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => 
                content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return {
        props: {
            posts
        }
    }
}