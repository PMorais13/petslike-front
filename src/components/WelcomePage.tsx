import { useState } from 'react';
import { Heart, Camera, Users, MapPin, Award, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomePageProps {
  user: any;
  onComplete: () => void;
}

export function WelcomePage({ user, onComplete }: WelcomePageProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Heart,
      title: `Bem-vindo ao PetsLike, ${user.name}!`,
      description: 'A rede social feita especialmente para quem ama pets',
      content: (
        <div className="text-center space-y-6">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-purple-50 p-4 rounded-xl">
              <Camera className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Compartilhe fotos</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Conecte-se</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Descubra lugares</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Adote com amor</p>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Users,
      title: 'Conecte-se com outros pet lovers',
      description: 'Siga pessoas interessantes e faça parte da comunidade',
      content: (
        <div className="space-y-4">
          {[
            { name: 'Marina Santos', pets: '2 gatos', followers: '1.2k', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face' },
            { name: 'Carlos Silva', pets: '1 cão', followers: '856', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
            { name: 'Julia Costa', pets: '3 pets', followers: '2.1k', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' }
          ].map((person, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <img src={person.image} alt={person.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-gray-900">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.pets} • {person.followers} seguidores</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                Seguir
              </Button>
            </div>
          ))}
        </div>
      )
    },
    {
      icon: Heart,
      title: 'Tudo pronto!',
      description: 'Agora você pode explorar o mundo dos pets no PetsLike',
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10 text-white fill-current" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              Comece compartilhando a primeira foto do seu pet ou explore o feed para descobrir conteúdos incríveis!
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4">
            <IconComponent className="w-8 h-8 text-white fill-current" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {currentStepData.title}
          </h1>
          <p className="text-gray-600">
            {currentStepData.description}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-2 mb-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            Passo {currentStep + 1} de {steps.length}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100 mb-6">
          {currentStepData.content}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {currentStep < steps.length - 1 && (
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1 h-12 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Pular
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
          >
            {currentStep < steps.length - 1 ? (
              <div className="flex items-center gap-2">
                Próximo
                <ArrowRight className="w-4 h-4" />
              </div>
            ) : (
              'Começar a usar'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}