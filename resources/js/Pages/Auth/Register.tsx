import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import * as React from "react"
import { Input } from "@/Components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"


export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: 0,
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    const roleChange = (role) => {
        setData('role', role)
    }

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="firstName" value="First Name" />

                    <Input
                        id="firstName"
                        name="firstName"
                        value={data.firstName}
                        className="mt-1 block w-full"
                        autoComplete="firstName"
                        isFocused={true}
                        onChange={(e) => setData("firstName", e.target.value)}
                        required
                    />

                    <InputError message={errors.firstName} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="lastName" value="Lasr Name" />

                    <Input
                        id="lastName"
                        name="lastName"
                        value={data.lastName}
                        className="mt-1 block w-full"
                        autoComplete="lastName"
                        isFocused={true}
                        onChange={(e) => setData("lastName", e.target.value)}
                        required
                    />

                    <InputError message={errors.lastName} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                 <div className="mt-4">
                    <InputLabel htmlFor="role" value="User Type" />
                    <Select onValueChange={(e) => roleChange(e)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>User Type</SelectLabel>
                        <SelectItem value="2">Client</SelectItem>
                        <SelectItem value="3">Rewinder</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
