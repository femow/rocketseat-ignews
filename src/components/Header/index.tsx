import { ActiveLink } from '../ActiveLink';

import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'


export default function Header () {

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}