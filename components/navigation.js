import Link from 'next/link'

const Navigation = () => {
    return (
        <ul>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/new">
                    <a>New</a>
                </Link>
            </li>
        </ul>
    )
}

export default Navigation;