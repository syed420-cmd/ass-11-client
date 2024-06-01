import { useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import api from '../../api/config';

const fetchPosts = async () => {
  const { data } = await api.get('/post/gettopposts');
  return data;
};

const FeaturedBlogs = () => {
  const {
    data: postsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const columns = useMemo(
    () => [
      {
        header: 'Serial Number',
        accessorKey: 'serialNumber',
        cell: (info) => info.row.index + 1,
      },
      {
        header: 'Blog Title',
        accessorKey: 'title',
      },
      {
        header: 'Blog Owner',
        accessorKey: 'user.name',
      },
      {
        header: 'Profile Picture',
        accessorKey: 'user.profilePicture',
        cell: ({ getValue }) => (
          <img
            src={getValue()}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        ),
      },
    ],
    [],
  );

  const tableData = useMemo(() => {
    if (!postsData) {
      return [];
    }
    return postsData.posts;
  }, [postsData]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return (
      <section className="section pt-0">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold mb-4">Featured Blogs</h2>
          <Skeleton count={10} />
        </div>
      </section>
    );
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <section className="section pt-0">
      <div className="container mx-auto">
        <h2 className="text-xl font-semibold mb-4">Featured Blogs</h2>
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 px-6 text-left"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === 'desc'
                        ? ' 🔽'
                        : ' 🔼'
                      : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-6 text-left">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
