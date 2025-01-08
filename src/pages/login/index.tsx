// Libs
import { useEffect, useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux";
// Auth
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
// Components
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// Assets
import { ArrowLeft } from "lucide-react"
// Scripts
import { login } from "@/store/slices/authentication";
// Types
import { RootState } from "@/store";


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
})

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/panel");
        }
    }, [isAuthenticated, navigate])

    function onSubmit(values: z.infer<typeof formSchema>) {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                setLoading(true);
                return signInWithEmailAndPassword(auth, values.email, values.password);
            })
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(login({ email: user.email!, uid: user.uid }));
                navigate("/panel");
            })
            .catch((error) => {
                console.error("Login error:", error.code, error.message);
            })
            .finally(() => setLoading(false));
    }

    return (
        <div className="p-4 lg:p-10 max-w-[1400px] mx-auto">
            <div className="max-w-[400px] mx-auto">
                <Link to={"/"}>
                    <Button className="mr-4" variant={"outline"}><ArrowLeft />Voltar</Button>
                </Link>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-4 mt-4 border border-slate-200 rounded">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email:</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha:</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={loading}>Login</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login;