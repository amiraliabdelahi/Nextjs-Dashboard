import { updateUser } from "@/app/actions/update";
import prisma from "@/app/config/db";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function UsersIdPage({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
   const findFromUser = await prisma.users.findFirst({
      where: {
         id: params.id
      }
   })
   return (
      <form action={
         async (data: FormData) => {
            "use server"
            await updateUser(params.id, data)
            redirect("/dashboard/users")
         }
      } className="flex justify-center gap-10">
         <main className="bg-[#151c2c] rounded-lg p-6 w-full flex flex-col items-center h-fit gap-2 ">
            <Image src={findFromUser?.img!} alt="" className="h-60 w-60" width={100} height={100} />
            <label
               htmlFor="inputtt"
               className="flex items-center justify-center h-10 w-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#151c2c] transition-all duration-300 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
               <svg
                  className="w-8 h-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
               >
                  <path
                     stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
               </svg>
               <input
                  type="file"
                  id="inputtt"
                  name="file"
                  className="hidden"
               />
            </label>
            <p className="font-bold text-lg">{findFromUser?.username}</p>
         </main>
         <main className="w-full flex flex-col gap-2 bg-[#151c2c] rounded-lg p-6">
            <div className="flex flex-col gap-2">
               <p>Username</p>
               <input defaultValue={searchParams.username} className="p-2 rounded-md outline-none bg-[#0f121b]" type="text" name="username" required />
            </div>
            <div className="flex flex-col gap-2">
               <p>Email Address</p>
               <input defaultValue={searchParams.email} className="p-2 rounded-md outline-none bg-[#0f121b]" type="text" name="email" required />
            </div>
            <div className="flex flex-col gap-2">
               <p>Password</p>
               <input defaultValue={searchParams.password} className="p-2 rounded-md outline-none bg-[#0f121b]" type="text" name="password" />
            </div>
            <div className="flex flex-col gap-2">
               <p>Phone Number</p>
               <input defaultValue={searchParams.phonenumber} className="p-2 rounded-md outline-none bg-[#0f121b]" type="text" name="phone" />
            </div>
            <div className="flex flex-col gap-2">
               <p>Address</p>
               <textarea defaultValue={searchParams.address} className="p-2 rounded-md outline-none bg-[#0f121b]" rows={5} name="address"></textarea>
            </div>
            <div className="flex flex-col gap-2">
               <p>is Admin?</p>
               <select defaultValue={searchParams.isAdmin} name="isAdmin" className="p-2 rounded-md bg-[#0f121b] outline-none">
                  <option value="user">No</option>
                  <option value="admin">Yes</option>
               </select>
            </div>
            <div className="flex flex-col gap-2">
               <p>is Active?</p>
               <select defaultValue={searchParams.isActive} name="isActive" className="p-2 rounded-md bg-[#0f121b] outline-none">
                  <option value="general" disabled>is Active?</option>
                  <option value="done">Done</option>
                  <option value="pending">Pending</option>
                  <option value="canceled">canceled</option>
               </select>
            </div>
            <button className="bg-purple-600 p-2 font-semibold rounded-md" type="submit">Update User</button>
         </main>
      </form>
   )
}