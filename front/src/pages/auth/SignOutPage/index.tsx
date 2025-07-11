import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSignInRoute } from "../../../lib/routes";
import { trpc } from '../../../lib/trpc'
import { Loader } from "../../../components/Loader";


export const SignOutPage = () => {
    const navigate = useNavigate()
    const trpcUtils = trpc.useUtils()
    useEffect(() => {
        Cookies.remove('token')
        void trpcUtils.invalidate().then(() => {
            navigate(getSignInRoute())
        })
    }, [])

    return <Loader type="section" />
}