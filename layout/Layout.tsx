import { FunctionComponent } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { LayoutProps } from "./Layout.props";
import Sidebar from "./Sidebar/Sidebar";
import s from './Layout.module.css';


const {wrapper,header,sidebar,footer,body,btn,content} = s;
const Layout = ({children,...props}: LayoutProps): JSX.Element => {
    const {posts}:any = props;
    return (
        <>
        <div className={wrapper}>
            <Header className={header} />
                <Sidebar posts={posts} className={sidebar} />
                <div className={body}>
                {children}
                </div>

            <Footer className={footer}/>
            {/* <div className={content}> <button className={btn}></button></div> */}
        </div>
</>
    );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        
        return (
            <Layout {...props}>
                
                <Component {...props} />
            </Layout>
        );
    };
};