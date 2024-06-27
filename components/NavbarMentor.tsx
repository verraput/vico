import Link from 'next/link'
import React from 'react'

const NavbarMentor = () => {
  return (
    <nav className="bg-base-300 sticky top-0 z-[1000]">
    <div className="navbar container mx-auto gap-x-10">
      <div className="flex-1">
        <Link href={"/mentor"} className="btn btn-ghost text-xl">
          Vico
        </Link>
      </div>
      <div className="w-full flex gap-x-5">
        <Link href={"/courses"} className="hover:underline whitespace-nowrap">Courses</Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link href={"/login"}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default NavbarMentor