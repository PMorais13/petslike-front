import { Heart, Search, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PawIcon } from './PawIcon';

export function AdoptionPage() {
  const petsForAdoption = [
    {
      id: 1,
      name: "Thor",
      image: "https://images.unsplash.com/photo-1708604191993-e9e6a0363210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBwdXBweSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODg4MDgxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      species: "🐕",
      speciesText: "dog",
      breed: "Golden Retriever",
      age: "3 anos",
      gender: "Macho",
      status: "Para Adoção"
    },
    {
      id: 2,
      name: "Miau",
      image: "https://images.unsplash.com/photo-1752520669463-34d673eeaed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWFtZXNlJTIwY2F0JTIwb3JhbmdlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4OTIzMTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      species: "🐱",
      speciesText: "cat",
      breed: "Siamês",
      age: "2 anos",
      gender: "Fêmea",
      status: "Para Adoção"
    },
    {
      id: 3,
      name: "Pingo",
      image: "https://images.unsplash.com/photo-1544566192-894dbe2fc164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIweWVsbG93JTIwbWFjYXclMjBwYXJyb3R8ZW58MXx8fHwxNzU4OTIzMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      species: "🐦",
      speciesText: "bird",
      breed: "Canário",
      age: "1 ano",
      gender: "Macho",
      status: "Para Adoção"
    }
  ];

  const lostPets = [];
  const organizations = [];

  const PetCard = ({ pet }: { pet: typeof petsForAdoption[0] }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
      <div className="relative">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold text-gray-900">{pet.name}</h3>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
            {pet.status}
          </span>
        </div>
        
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">{pet.species}</span>
            <span>{pet.speciesText}</span>
            <span className="text-gray-400">•</span>
            <span>{pet.age}</span>
            <span className="text-gray-400">•</span>
            <span>{pet.gender}</span>
          </div>
          <div className="text-sm text-gray-600">{pet.breed}</div>
        </div>
        
        <div className="flex gap-2">
          <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
            <PawIcon className="w-4 h-4 mr-2" filled />
            Quero Adotar
          </Button>
          <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50">
            Ver Mais
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Adoção e Pets Perdidos</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Encontre seu novo melhor amigo ou ajude pets perdidos a voltarem para casa.
        </p>
        
        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar por nome, espécie ou raça..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors"
            />
          </div>
          <Select defaultValue="todas">
            <SelectTrigger className="w-48 bg-gray-100 border-none focus:ring-2 focus:ring-purple-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as espécies</SelectItem>
              <SelectItem value="cao">Cão</SelectItem>
              <SelectItem value="gato">Gato</SelectItem>
              <SelectItem value="passaro">Pássaro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <Tabs defaultValue="pets-adocao" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl bg-gray-100">
            <TabsTrigger 
              value="pets-adocao"
              className="data-[state=active]:bg-white data-[state=active]:text-purple-600"
            >
              Pets para Adoção
            </TabsTrigger>
            <TabsTrigger 
              value="pets-perdidos"
              className="data-[state=active]:bg-white data-[state=active]:text-purple-600"
            >
              Pets Perdidos
            </TabsTrigger>
            <TabsTrigger 
              value="ongs"
              className="data-[state=active]:bg-white data-[state=active]:text-purple-600"
            >
              ONGs e Organizações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pets-adocao" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {petsForAdoption.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pets-perdidos" className="mt-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PawIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pet perdido registrado</h3>
              <p className="text-gray-500">Felizmente não há pets perdidos no momento.</p>
            </div>
          </TabsContent>

          <TabsContent value="ongs" className="mt-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PawIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">ONGs e organizações</h3>
              <p className="text-gray-500">Conecte-se com organizações de proteção animal.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}