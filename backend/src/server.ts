import app from "./app.js";
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

// I have to leave this here first while resolving the conflict.
// The next PR will put it in the appropriate file.
app.get('/dashboard/daily-fact', async (req, res) => {
  return res.status(200).json({
    name: 'Maize (Corn)',
    timestamp: '2024-09-12T07:28:30.874Z',
    image:
      'https://plantura.garden/uk/wp-content/uploads/sites/2/2022/04/corn-cob.jpg',
    description:
      'Staple food crop in many African countries, known for its versatility in cooking and high yield potential.',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


