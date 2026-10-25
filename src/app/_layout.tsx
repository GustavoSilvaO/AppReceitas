import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{title: 'Minhas Receitas'}}
      />
      <Stack.Screen
        name= 'detalhes'
        options= {{title: 'detalhes da receita'}}
      />
      </Stack>
  );
}
