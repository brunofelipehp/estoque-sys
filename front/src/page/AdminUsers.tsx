import { Header } from '../components/Header';

import { Loading } from '@/components/Loading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFindAllUsers } from '@/hooks/useUsers';
import { UserTableProps } from '@/schemas/UserSchema';
import { MdLibraryBooks } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export const AdminUsers = () => {


  const [searchParams] = useSearchParams();



  const { users, isLoading } = useFindAllUsers();


  return (
    <>
      <Header />
      <div className="flex h-screen  bg-zinc-50">
        <Sidebar />
        <div className="p-6 mt-24 w-3/6 mx-auto space-y-7">

          <div className="p-2 border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-center'>Nome</TableHead>
                  <TableHead className='text-center'>Email</TableHead>
                  <TableHead className='text-center'>Acesso</TableHead>

                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ?
                  <TableRow>
                    <TableCell colSpan={6} className='relative'>
                      <Loading />
                    </TableCell>
                  </TableRow>
                  :
                  <>
                    {users && users.length > 0 ? (
                      users.map((user: UserTableProps) => {
                        return (
                          <TableRow key={user.id} className='text-center'>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>

                            <TableCell>
                              <a href="" className='text-violetPrimer'>
                                <MdLibraryBooks size={24} />
                              </a>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className='text-center'>Não há registro de produto</TableCell>
                      </TableRow>
                    )}
                  </>
                }

              </TableBody>
            </Table>

          </div>
          {/* <PaginationForm page={page} pages={totalPages} /> */}
        </div>
      </div>
    </>
  );
};
