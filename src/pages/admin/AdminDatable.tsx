import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/store';
import { esDeleteDoc, formatUserData } from 'exchanges-shared';
import { auth, db as FIREBASE_DB } from '../../../firebaseConfig';

// import Customer from "@/types/Customer";
// import Facility from "@/types/Facility";
// import { FunderGroup } from "@/types/Funder";
// import { connectApiAxios } from "@/services/axios";
// import { FFformat } from "@/lib/dates";

// import { ContactCell, NameCell } from "@/types";

import { DataTable } from '../../components/tables/Datatable';
// import Loader from "@/components/loaders/Loader";
import { EyeIcon, ChevronRight, Phone, Mail, AlertCircle, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Checkbox } from '@/components/ui/checkbox';

export default function AdminDatable() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { users, languages } = useStore();

  function handleDeleteUser(userId) {
    const userFB = auth.currentUser;
    console.log(userFB);

    if (!userFB) {
      return toast({
        title: 'Error deleling account',
        description: 'userFB no exist',
        action: (
          <ToastAction altText="Goto schedule to undo" onClick={() => navigate('/login')}>
            Login
          </ToastAction>
        ),
      });
    }
    userFB
      .delete()
      .then(() => {
        console.log('auth deleted success');
        esDeleteDoc(FIREBASE_DB, 'users', userId).then(() => {
          console.log('user collection deleted success');
          toast({
            title: 'Account deleted',
            description: 'description',
            action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
          });
        });
      })
      .catch((error) => {
        toast({
          title: 'Error deleling account',
          description: error.message,
          action: (
            <ToastAction altText="Goto schedule to undo" onClick={() => navigate('/login')}>
              Login
            </ToastAction>
          ),
        });
        console.log('error', error);
      });
  }

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({ row }) => <div className="">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'avatarUrl',
      header: 'avatar',
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage
            src={row.getValue('avatarUrl') ? row.getValue('avatarUrl') : 'https://github.com/shadcn.png'}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: 'expoPushToken',
      header: 'expoPushToken',
      cell: ({ row }) => <div className="">{row.getValue('expoPushToken')}</div>,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => <div className="">{row.getValue('role')}</div>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div className="">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'firstname',
      header: 'Firstname',
      cell: ({ row }) => <div className="">{row.getValue('firstname')}</div>,
    },
    {
      accessorKey: 'lastname',
      header: 'Lastname',
      cell: ({ row }) => <div className="">{row.getValue('lastname')}</div>,
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      cell: ({ row }) => <div className="">{row.getValue('gender')}</div>,
    },
    {
      accessorKey: 'username',
      header: 'username',
      cell: ({ row }) => <div className="">{row.getValue('username')}</div>,
    },
    {
      accessorKey: 'teachingLanguageUnfolded',
      header: 'teaching',
      cell: ({ row }) => (
        <div className="">
          <Avatar size="sm">
            <AvatarImage
              src={`https://www.worldometers.info//img/flags/small/tn_${row.getValue('teachingLanguageUnfolded').iso_alpha2}-flag.gif`}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* {row.getValue('learningLanguageUnfolded').id} */}
        </div>
      ),
    },
    {
      accessorKey: 'learningLanguageUnfolded',
      header: 'learning',
      cell: ({ row }) => (
        <div className="">
          <Avatar size="sm">
            <AvatarImage
              src={`https://www.worldometers.info//img/flags/small/tn_${row.getValue('learningLanguageUnfolded').iso_alpha2}-flag.gif`}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* {row.getValue('learningLanguageUnfolded').id} */}
        </div>
      ),
    },
    {
      accessorKey: 'level',
      header: 'level',
      cell: ({ row }) => <div className="">{row.getValue('level')}</div>,
    },
    {
      accessorKey: 'platform',
      header: 'platform',
      cell: ({ row }) => <div className="">{row.getValue('platform')}</div>,
    },

    // {
    //   accessorKey: "company",
    //   header: "Company",
    //   cell: ({ row }) => {
    //     const company: NameCell = row.getValue("company");
    //     return (
    //       <div className="flex flex-col capitalize">
    //         <div className="mb-1 font-medium">{company.name}</div>
    //         <div className="text-xs font-light text-muted-foreground">
    //           {company.createdAt}
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    // {

    // {
    //   accessorKey: "firstname",
    //   header: "First Name",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("firstname")}</div>
    //   ),
    // },
    // {
    //   accessorKey: "surname",
    //   header: "Surname",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("surname")}</div>
    //   ),
    // },
    // {
    //   accessorKey: "contact",
    //   header: "Contact",
    //   cell: ({ row }) => {
    //     const contact: ContactCell = row.getValue("contact");

    //     return (
    //       <div className="flex flex-col text-sm capitalize">
    //         <div className="flex items-center">
    //           <Phone className="mr-2 h-4 w-4" />
    //           <div>{contact.phone}</div>
    //         </div>
    //         <div className="flex items-center lowercase">
    //           <Mail className="mr-2 h-4 w-4" />
    //           <div>{contact.email}</div>
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      id: 'action',
      accessorKey: 'action',
      cell: ({ row }) => {
        return (
          <div className="flex space-x-1">
            <Button
              variant="icon"
              className="ml-auto flex border bg-muted rounded"
              onClick={() => {
                handleDeleteUser(row.getValue('id'));
              }}
            >
              <Trash2 className="ml-1 h-4 w-6" />
            </Button>
            <Button
              size="icon"
              className=""
              onClick={() => {
                toast({
                  title: 'Scheduled: Catch up ',
                  description: 'Friday, February 10, 2023 at 5:57 PM',
                  action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
                });
                // navigate(`/customers/${row.getValue('id')}`);
              }}
            >
              <EyeIcon className="ml-1 h-4 w-6" />
            </Button>
          </div>
        );
      },
    },
  ];

  // if (isPending) return <Loader />;
  if (!users) {
    return <div>loading</div>;
  }

  // if (error)
  //   return (
  //     <Alert variant="destructive" className="mt-8">
  //       <AlertCircle className="h-4 w-4" />
  //       <AlertTitle>An error has occurred: </AlertTitle>
  //       <AlertDescription>{error.message}</AlertDescription>
  //     </Alert>
  //   );
  // if (isFetching) return <Loader />;
  const formattedApiResponse = {
    data: users.map((u) => formatUserData(u, languages)),
  };

  return (
    <div>
      <div className="text-2xl">Public View</div>
      <DataTable apiResponse={formattedApiResponse} searchColumn="role" columns={columns} />
    </div>
  );
}
