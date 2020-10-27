import Head from 'next/head'
import Navigation from './navigation'

const Container = (props) =>(
    <div>
        <Navigation/>
        <Head>
            <title>Testing Nextjs</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/litera/bootstrap.min.css"/>
            <link rel="stylesheet" href="/styles.css"/>
        </Head>
        
        
        <div>
            {props.children}
        </div>
    </div>
)

export default Container;