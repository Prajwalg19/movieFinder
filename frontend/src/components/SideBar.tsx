import {HiArrowSmRight, HiChartPie, HiTable, HiUser, HiViewBoards} from "react-icons/hi";
import {TextInput} from "flowbite-react";
import {IoIosSearch} from "react-icons/io";
import {Link} from "react-router-dom";
import {Sidebar} from "flowbite-react";

export default function Drawer() {
    return (
        <Sidebar aria-label="Default sidebar example" className="h-screen !w-[400px]">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" as={Link} className="font-bold text-2xl text-red-500 font-sans" >
                        Movie Finder
                    </Sidebar.Item>

                    <Sidebar.Item href="#" >
                        <TextInput placeholder="Search Movie" icon={IoIosSearch} />
                    </Sidebar.Item>

                    <Sidebar.Item href="#" icon={HiChartPie}>
                        Home
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
                        Kanban
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiUser}>
                        Users
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiArrowSmRight}>
                        Sign In
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiTable}>
                        Sign Up
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>

    )
}
