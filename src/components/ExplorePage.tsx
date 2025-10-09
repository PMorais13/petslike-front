import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ExplorePage() {
  const allPets = [
    {
      id: 1,
      name: "Thor",
      species: "🐕",
      age: "3 anos",
      breed: "Golden Retriever",
      image: "https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg4NTQxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      type: "dog"
    },
    {
      id: 2,
      name: "Miau",
      species: "🐱",
      age: "2 anos",
      breed: "Siamês",
      image: "https://images.unsplash.com/photo-1608574592641-d8b220d05e49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWFtZXNlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4OTIyOTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      type: "cat"
    },
    {
      id: 3,
      name: "Pingo",
      species: "🐦",
      age: "1 ano",
      breed: "Canário",
      image: "https://images.unsplash.com/photo-1723117303524-1c2d1c72a9a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5hcnklMjBiaXJkJTIweWVsbG93fGVufDF8fHx8MTc1ODgyNzkxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      type: "bird"
    },
    {
      id: 4,
      name: "JoJo",
      species: "🐕",
      age: "",
      breed: "Pit Bull",
      image: "https://images.unsplash.com/photo-1708892873404-ee63a7002f36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXRidWxsJTIwZG9nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4OTIyOTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      type: "dog"
    }
  ];

  const pets = allPets.filter(pet => pet.type === 'dog' || pet.type === 'cat' || pet.type === 'bird');
  const services = []; // Empty for now as shown in the image (6)
  const tutors = []; // Empty as shown in the image (0)

  const tabs = [
    { value: "todos", label: "Todos", count: allPets.length },
    { value: "pets", label: "Pets", count: pets.length },
    { value: "servicos", label: "Serviços", count: 6 },
    { value: "tutores", label: "Tutores", count: 0 }
  ];

  const PetCard = ({ pet }: { pet: typeof allPets[0] }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={pet.image} alt={pet.name} />
          <AvatarFallback className="bg-purple-100 text-purple-600">
            {pet.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900">{pet.name}</span>
            <span className="text-lg">{pet.species}</span>
            {pet.age && <span className="text-sm text-gray-500">{pet.age}</span>}
          </div>
          <span className="text-sm text-gray-600">{pet.breed}</span>
        </div>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-purple-600 border-purple-200 hover:bg-purple-50"
        onClick={() => window.location.hash = 'perfil-usuario'}
      >
        Ver Perfil
      </Button>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Search className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Explorar Petslike</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar pets, tutores, serviços..."
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl bg-gray-100">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="data-[state=active]:bg-white data-[state=active]:text-purple-600"
              >
                {tab.label} ({tab.count})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="todos" className="mt-8">
            <div className="space-y-1">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Pets</h2>
              <div className="space-y-3">
                {allPets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pets" className="mt-8">
            <div className="space-y-3">
              {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="servicos" className="mt-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum serviço encontrado</h3>
              <p className="text-gray-500">Tente pesquisar por outros termos ou explore outras categorias.</p>
            </div>
          </TabsContent>

          <TabsContent value="tutores" className="mt-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum tutor encontrado</h3>
              <p className="text-gray-500">Tente pesquisar por outros termos ou explore outras categorias.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}