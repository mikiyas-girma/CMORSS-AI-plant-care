import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/gui/components/dashboard-myplants/Table";
import { BotMessageSquare } from 'lucide-react'

const data = [
    { id: 1, name: "Plant A", species: "Species A", location: "Location A" },
    { id: 2, name: "Plant B", species: "Species B", location: "Location B" },
    { id: 3, name: "Plant C", species: "Species C", location: "Location C" },
    { id: 4, name: "Plant D", species: "Species D", location: "Location D" },
    { id: 5, name: "Plant E", species: "Species E", location: "Location E" },
];

export default function Component() {
  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Species</TableHead>
            <TableHead className="">Get Help</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id} className={index % 2 === 0 ? 'bg-muted/100' : ''}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="hidden sm:table-cell">{item.species}</TableCell>
              <TableCell className="text-right">
                <Link to={`/dashboard/myplants/${item.id}`} className="text-primary">
                  <BotMessageSquare className="w-10 h-7" color='green' />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
