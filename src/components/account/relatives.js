import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';

/*const [userRelatives, setUserRelatives] = useState([]);
    const getUserRelatives = useCallback(async () => {
    
        try {
          const response = await axiosInstance.get('api/v1/users/relatives');

          console.log(`userDashboard: ${JSON.stringify(response,null,2)}`)
    
          setUserRelatives(response.data);

          console.log(`userDashboard: ${JSON.stringify(userAccount,null,2)}`)
        } catch (error) {
          console.log(error);
      }
    }, []);

  useEffect(() => {
    getUserRelatives();
  }, [getUserRelatives]);*/
const familyMembersAdded = [
    {
      "_id": "5f9f1b0b0b9b0b0b0b0b0b0b",
      "profile_picture": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      "name": "John Doe",
      "birthdate": "2023-02-01T17:21:48.585Z",
      "gender": "male",
      "medical_conditions": [
        "Diabetes"
      ],
      "address": {
        "street": "123 Main St",
        "postal_code": "1234-456",
        "city": "New York",
        "state": "NY",
        "country": "US",
        "coordinates": {
          "latitude": 40.7128,
          "longitude": 74.006
        }
      }
    }
  ];

const Relatives = (props) => (
  <Card {...props}>
    <CardHeader title="Familiares" />
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Parentesco
              </TableCell>
              <TableCell>
                Nome
              </TableCell>
              <TableCell>
                Observações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {familyMembersAdded.map((relative) => (
              <TableRow
                hover
                key={relative.id}
              >
                <TableCell>
                  {relative.name}
                </TableCell>
                <TableCell>
                  {relative.name}
                </TableCell>
                <TableCell>
                  {relative.medical_conditions}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
  </Card>
);

export default Relatives