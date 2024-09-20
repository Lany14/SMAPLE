const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "PHONE", uid: "phone" },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  // { name: "Vacation", uid: "vacation" },
];

const users = [
  // Kween Leng, John Doe, Jane Smith, Alice Johnson, Bob Brown, Charlie Davis, Diana Evans, Ethan Foster, Fiona Green, George Harris, Hannah White, Ian King, Jack Lee, Karen Martinez, Liam Nelson, Mia Parker, Noah Quinn, Olivia Roberts, Paul Scott, Quinn Taylor, Rachel Adams, Sam Wilson, Tina Young, Uma Brown, Victor Clark, Wendy Lewis, Xander Hall, Yara Allen, Zane Baker, Ava Carter, Ben Davis, Chloe Evans, David Foster, Ella Green, Frank Harris, Grace Johnson, Henry King, Isla Lee, Jack Martinez, Kara Nelson, Leo Parker, Maya Quinn, Nina Roberts, Oscar Scott, Piper Taylor, Quincy Adams, Ruby Wilson, Steve Young, Tina Brown, Uma Clark, Victor Lewis
  {
    id: 1,
    name: "Kween Leng",
    age: "23",
    phone: "09123456789",
    avatar: "",
    email: "jcquirao@ccc.edu.ph",
  },
  {
    id: 2,
    name: "John Doe",
    age: "30",
    phone: "09123456780",
    avatar: "",
    email: "johndoe@example.com",
  },
  {
    id: 3,
    name: "Jane Smith",
    age: "28",
    phone: "09123456781",
    avatar: "",
    email: "janesmith@example.com",
  },
  {
    id: 4,
    name: "Alice Johnson",
    age: "35",
    phone: "09123456782",
    avatar: "",
    email: "alicejohnson@example.com",
  },
  {
    id: 5,
    name: "Bob Brown",
    age: "40",
    phone: "09123456783",
    avatar: "",
    email: "bobbrown@example.com",
  },
  {
    id: 6,
    name: "Charlie Davis",
    age: "22",
    phone: "09123456784",
    avatar: "",
    email: "charliedavis@example.com",
  },
  {
    id: 7,
    name: "Diana Evans",
    age: "27",
    phone: "09123456785",
    avatar: "",
    email: "dianaevans@example.com",
  },
  {
    id: 8,
    name: "Ethan Foster",
    age: "32",
    phone: "09123456786",
    avatar: "",
    email: "ethanfoster@example.com",
  },
  {
    id: 9,
    name: "Fiona Green",
    age: "29",
    phone: "09123456787",
    avatar: "",
    email: "fionagreen@example.com",
  },
  {
    id: 10,
    name: "George Harris",
    age: "31",
    phone: "09123456788",
    avatar: "",
    email: "georgeharris@example.com",
  },
  {
    id: 11,
    name: "Hannah White",
    age: "26",
    phone: "09123456789",
    avatar: "",
    email: "hannahwhite@example.com",
  },
  {
    id: 12,
    name: "Ian King",
    age: "24",
    phone: "09123456790",
    avatar: "",
    email: "ianking@example.com",
  },
  {
    id: 13,
    name: "Jack Lee",
    age: "33",
    phone: "09123456791",
    avatar: "",
    email: "jacklee@example.com",
  },
  {
    id: 14,
    name: "Karen Martinez",
    age: "36",
    phone: "09123456792",
    avatar: "",
    email: "karenmartinez@example.com",
  },
  {
    id: 15,
    name: "Liam Nelson",
    age: "21",
    phone: "09123456793",
    avatar: "",
    email: "liamnelson@example.com",
  },
  {
    id: 16,
    name: "Mia Parker",
    age: "25",
    phone: "09123456794",
    avatar: "",
    email: "miaparker@example.com",
  },
  {
    id: 17,
    name: "Noah Quinn",
    age: "34",
    phone: "09123456795",
    avatar: "",
    email: "noahquinn@example.com",
  },
  {
    id: 18,
    name: "Olivia Roberts",
    age: "28",
    phone: "09123456796",
    avatar: "",
    email: "oliviaroberts@example.com",
  },
  {
    id: 19,
    name: "Paul Scott",
    age: "37",
    phone: "09123456797",
    avatar: "",
    email: "paulscott@example.com",
  },
  {
    id: 20,
    name: "Quinn Taylor",
    age: "23",
    phone: "09123456798",
    avatar: "",
    email: "quinntaylor@example.com",
  },
  {
    id: 21,
    name: "Rachel Adams",
    age: "30",
    phone: "09123456799",
    avatar: "",
    email: "racheladams@example.com",
  },
  {
    id: 22,
    name: "Sam Wilson",
    age: "27",
    phone: "09123456800",
    avatar: "",
    email: "samwilson@example.com",
  },
  {
    id: 23,
    name: "Tina Young",
    age: "32",
    phone: "09123456801",
    avatar: "",
    email: "tinayoung@example.com",
  },
  {
    id: 24,
    name: "Uma Brown",
    age: "29",
    phone: "09123456802",
    avatar: "",
    email: "umabrown@example.com",
  },
  {
    id: 25,
    name: "Victor Clark",
    age: "31",
    phone: "09123456803",
    avatar: "",
    email: "victorclark@example.com",
  },
  {
    id: 26,
    name: "Wendy Lewis",
    age: "26",
    phone: "09123456804",
    avatar: "",
    email: "wendylewis@example.com",
  },
  {
    id: 27,
    name: "Xander Hall",
    age: "24",
    phone: "09123456805",
    avatar: "",
    email: "xanderhall@example.com",
  },
  {
    id: 28,
    name: "Yara Allen",
    age: "33",
    phone: "09123456806",
    avatar: "",
    email: "yaraallen@example.com",
  },
  {
    id: 29,
    name: "Zane Baker",
    age: "36",
    phone: "09123456807",
    avatar: "",
    email: "zanebaker@example.com",
  },
  {
    id: 30,
    name: "Ava Carter",
    age: "21",
    phone: "09123456808",
    avatar: "",
    email: "avacarter@example.com",
  },
  {
    id: 31,
    name: "Ben Davis",
    age: "25",
    phone: "09123456809",
    avatar: "",
    email: "bendavis@example.com",
  },
  {
    id: 32,
    name: "Chloe Evans",
    age: "34",
    phone: "09123456810",
    avatar: "",
    email: "chloeevans@example.com",
  },
  {
    id: 33,
    name: "David Foster",
    age: "28",
    phone: "09123456811",
    avatar: "",
    email: "davidfoster@example.com",
  },
  {
    id: 34,
    name: "Ella Green",
    age: "37",
    phone: "09123456812",
    avatar: "",
    email: "ellagreen@example.com",
  },
  {
    id: 35,
    name: "Frank Harris",
    age: "23",
    phone: "09123456813",
    avatar: "",
    email: "frankharris@example.com",
  },
  {
    id: 36,
    name: "Grace Johnson",
    age: "30",
    phone: "09123456814",
    avatar: "",
    email: "gracejohnson@example.com",
  },
  {
    id: 37,
    name: "Henry King",
    age: "27",
    phone: "09123456815",
    avatar: "",
    email: "henryking@example.com",
  },
  {
    id: 38,
    name: "Isla Lee",
    age: "32",
    phone: "09123456816",
    avatar: "",
    email: "islalee@example.com",
  },
  {
    id: 39,
    name: "Jack Martinez",
    age: "29",
    phone: "09123456817",
    avatar: "",
    email: "jackmartinez@example.com",
  },
  {
    id: 40,
    name: "Kara Nelson",
    age: "31",
    phone: "09123456818",
    avatar: "",
    email: "karanelson@example.com",
  },
  {
    id: 41,
    name: "Leo Parker",
    age: "26",
    phone: "09123456819",
    avatar: "",
    email: "leoparker@example.com",
  },
  {
    id: 42,
    name: "Maya Quinn",
    age: "24",
    phone: "09123456820",
    avatar: "",
    email: "mayaquinn@example.com",
  },
  {
    id: 43,
    name: "Nina Roberts",
    age: "33",
    phone: "09123456821",
    avatar: "",
    email: "ninaroberts@example.com",
  },
  {
    id: 44,
    name: "Oscar Scott",
    age: "36",
    phone: "09123456822",
    avatar: "",
    email: "oscarscott@example.com",
  },
  {
    id: 45,
    name: "Piper Taylor",
    age: "21",
    phone: "09123456823",
    avatar: "",
    email: "pipertaylor@example.com",
  },
  {
    id: 46,
    name: "Quincy Adams",
    age: "25",
    phone: "09123456824",
    avatar: "",
    email: "quincyadams@example.com",
  },
  {
    id: 47,
    name: "Ruby Wilson",
    age: "34",
    phone: "09123456825",
    avatar: "",
    email: "rubywilson@example.com",
  },
  {
    id: 48,
    name: "Steve Young",
    age: "28",
    phone: "09123456826",
    avatar: "",
    email: "steveyoung@example.com",
  },
  {
    id: 49,
    name: "Tina Brown",
    age: "37",
    phone: "09123456827",
    avatar: "",
    email: "tinabrown@example.com",
  },
  {
    id: 50,
    name: "Uma Clark",
    age: "23",
    phone: "09123456828",
    avatar: "",
    email: "umaclark@example.com",
  },
  {
    id: 51,
    name: "Victor Lewis",
    age: "30",
    phone: "09123456829",
    avatar: "",
    email: "victorlewis@example.com",
  },
];

export { columns, users, statusOptions };
