# 📦 Referência Rápida de Componentes - PetsLike

## 📊 Visão Geral

Este documento mapeia todos os componentes da aplicação, suas responsabilidades e dependências.

---

## 🏗️ Arquitetura de Componentes

```
App (Raiz)
│
├── Layout Components
│   ├── AppSidebar (Navegação principal)
│   ├── MobileHeader (Header mobile)
│   ├── PageRouter (Gerenciador de rotas)
│   └── LoadingScreen (Tela de carregamento)
│
├── Auth Components
│   ├── LoginPage
│   ├── RegisterPage
│   ├── WelcomePage
│   └── WelcomeScreen
│
├── Feed Components
│   ├── MainContent (Container do feed)
│   ├── PostItem (Card individual de post)
│   ├── PostDetailModal (Modal de detalhes do post)
│   └── MediaCarousel (Carrossel de imagens)
│
├── Profile Components
│   ├── ProfilePage (Perfil do usuário logado)
│   ├── UserProfilePage (Perfil de outros usuários)
│   └── ProfileSuggestions (Sugestões de perfis)
│
├── Service Pages
│   ├── Passeadores
│   │   ├── WalkersPage (Lista)
│   │   └── WalkerProfilePage (Perfil individual)
│   ├── Pet Shops
│   │   ├── PetShopsPage (Lista)
│   │   └── PetShopProfilePage (Perfil individual)
│   ├── Clínicas
│   │   ├── VetClinicsPage (Lista)
│   │   └── VetClinicProfilePage (Perfil individual)
│   ├── Adestradores
│   │   ├── TrainersPage (Lista)
│   │   └── TrainerProfilePage (Perfil individual)
│   └── Hospedagens
│       ├── HousingsPage (Lista)
│       └── HousingProfilePage (Perfil individual)
│
├── Community & Adoption
│   ├── AdoptionPage (Adoção de pets)
│   ├── CommunityPage (Feed da comunidade)
│   ├── ExplorePage (Explorar conteúdo)
│   └── PlacesPage (Lugares pet friendly)
│       └── PlaceProfilePage (Perfil de lugar)
│
└── Utility Components
    ├── ErrorBoundary (Captura de erros)
    ├── LogoutModal (Modal de confirmação de logout)
    └── PawIcon (Ícone de patinha customizado)
```

---

## 📋 Detalhamento por Componente

### **1. App.tsx / App.refactored.tsx**

**📍 Localização**: `/App.tsx`  
**🎯 Responsabilidade**: Componente raiz da aplicação  
**📦 Dependências**:
- Hooks: `useAuth`, `useNavigation`, `usePosts`, `useResponsive`
- Components: `AppSidebar`, `MobileHeader`, `PageRouter`, `LoadingScreen`
- Pages: `LoginPage`, `RegisterPage`, `WelcomePage`, `WelcomeScreen`

**🔧 Funcionalidades**:
- Gerenciar estado de autenticação
- Controlar navegação entre páginas
- Gerenciar posts do feed
- Detectar responsividade (mobile/desktop)
- Renderizar layout apropriado

**🔄 Fluxo de Renderização**:
```
1. Loading → Verificar se está carregando
2. WelcomeScreen → Primeira visita
3. Auth (Login/Register) → Não autenticado
4. WelcomePage → Após registro
5. Main App → Autenticado e pronto
```

**🔀 Estados Possíveis**:
- `isLoading: true` → Mostra LoadingScreen
- `showWelcomeScreen: true` → Mostra WelcomeScreen
- `user: null` → Mostra Login/Register
- `showWelcome: true` → Mostra WelcomePage
- `user: exists` → Mostra aplicação principal

---

### **2. AppSidebar**

**📍 Localização**: `/components/layout/AppSidebar.tsx` (novo) ou `/components/Sidebar.tsx` (antigo)  
**🎯 Responsabilidade**: Menu de navegação lateral  
**📦 Props**:
```typescript
interface SidebarProps {
  onNavigate?: () => void; // Callback ao navegar (usado no mobile)
}
```

**🔧 Funcionalidades**:
- Exibir logo do PetsLike
- Listar itens do menu principal
- Submenu expansível de Serviços
- Botão "Meu Perfil"
- Botão "Sair" com modal de confirmação
- Sincronizar item ativo com rota atual

**📊 Estrutura do Menu**:
```typescript
MENU_CONFIG = [
  { label: 'Feed', icon: Home, hash: '', page: 'feed' },
  { label: 'Explorar', icon: Search, hash: 'explorar', page: 'explorar' },
  { 
    label: 'Serviços', 
    icon: Settings, 
    hasSubmenu: true,
    submenu: [
      { label: 'Passeadores', hash: 'passeadores' },
      { label: 'Pet Shops', hash: 'petshops' },
      { label: 'Clínicas', hash: 'clinicas' },
      { label: 'Adestradores', hash: 'adestradores' },
      { label: 'Hospedagens', hash: 'hospedagens' },
    ]
  },
  { label: 'Comunidade', icon: Users, hash: 'comunidade' },
  { label: 'Adoção e Pets Perdidos', icon: Award, hash: 'adocao' },
  { label: 'Lugares Pet Friendly', icon: MapPin, hash: 'lugares' },
]
```

**🎨 Estados Visuais**:
- Item ativo: `bg-purple-50 text-purple-600`
- Item inativo: `text-gray-600 hover:bg-gray-50`
- Submenu aberto/fechado: ChevronDown/ChevronRight

---

### **3. MobileHeader**

**📍 Localização**: `/components/layout/MobileHeader.tsx`  
**🎯 Responsabilidade**: Header para dispositivos móveis  
**📦 Props**:
```typescript
interface MobileHeaderProps {
  onMenuToggle: () => void; // Callback para abrir/fechar sidebar mobile
}
```

**🔧 Funcionalidades**:
- Botão hamburger menu
- Logo do PetsLike
- Visível apenas em mobile (< 768px)

---

### **4. PageRouter**

**📍 Localização**: `/components/layout/PageRouter.tsx`  
**🎯 Responsabilidade**: Renderizar página correta baseado na rota  
**📦 Props**:
```typescript
interface PageRouterProps {
  currentPage: PageType;
  posts: Post[];
  onAddPost: (post: Omit<Post, 'id' | 'timestamp' | ...>) => void;
  onLikePost: (postId: string) => void;
}
```

**🗺️ Mapeamento de Rotas**:
```typescript
switch (currentPage) {
  case 'feed': return <MainContent />;
  case 'perfil': return <ProfilePage />;
  case 'explorar': return <ExplorePage />;
  case 'adocao': return <AdoptionPage />;
  case 'comunidade': return <CommunityPage />;
  case 'lugares': return <PlacesPage />;
  case 'perfil-lugar': return <PlaceProfilePage />;
  case 'passeadores': return <WalkersPage />;
  case 'perfil-passeador': return <WalkerProfilePage />;
  // ... outros casos
  default: return <MainContent />;
}
```

**🛡️ Error Handling**:
- Try/catch ao redor do switch
- Fallback UI com botão "Voltar ao Feed"

---

### **5. MainContent (Feed)**

**📍 Localização**: `/components/MainContent.tsx`  
**🎯 Responsabilidade**: Página principal do feed  
**📦 Props**:
```typescript
interface MainContentProps {
  posts: Post[];
  onAddPost: (post: Omit<Post, 'id' | 'timestamp' | ...>) => void;
  onLikePost: (postId: string) => void;
}
```

**🔧 Funcionalidades**:
- Campo de criação de novo post
- Upload de imagens
- Seleção de pet para marcar no post
- Lista de posts do feed
- Sugestões de perfis (sidebar direita)

**📐 Layout**:
```
┌─────────────────────────────────────────────────────┐
│  [Criar Post]                                       │
│  ┌──────────────────────────────────────────┐      │
│  │ O que está fazendo?                      │      │
│  │ [Upload Imagens] [Marcar Pet]            │      │
│  └──────────────────────────────────────────┘      │
├─────────────────────────────────────────────────────┤
│  [Post 1]                                           │
│  [Post 2]                                           │
│  [Post 3]                                           │
│  ...                                                 │
└─────────────────────────────────────────────────────┘
```

---

### **6. PostItem**

**📍 Localização**: `/components/PostItem.tsx`  
**🎯 Responsabilidade**: Card individual de post  
**📦 Props**:
```typescript
interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
  onClick?: () => void; // Abrir modal de detalhes
}
```

**🔧 Funcionalidades**:
- Exibir informações do autor
- Mostrar conteúdo do post (texto + imagens)
- Botões de interação (curtir, comentar, compartilhar)
- Timestamp do post
- Pet marcado (se houver)

**📐 Estrutura**:
```
┌─────────────────────────────────────┐
│ 👤 Nome do Autor        🐾 Pet      │
│ @username · 2h atrás                │
├─────────────────────────────────────┤
│ Texto do post...                    │
│                                     │
│ [Imagens do post]                   │
├─────────────────────────────────────┤
│ 🐾 123 curtidas  💬 45  🔄 12       │
└─────────────────────────────────────┘
```

**⚠️ Importante**: 
- Botão de like usa ícone de patinha (`PawIcon`)
- Estado de "liked" muda a cor da patinha

---

### **7. PostDetailModal**

**📍 Localização**: `/components/PostDetailModal.tsx`  
**🎯 Responsabilidade**: Modal com detalhes completos do post  
**📦 Props**:
```typescript
interface PostDetailModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onLike: (postId: string) => void;
}
```

**🔧 Funcionalidades**:
- Exibir post em tamanho maior
- Seção de comentários
- Formulário para adicionar comentário
- Galeria de imagens
- Informações do pet marcado

---

### **8. WalkersPage (Exemplo de Service Page)**

**📍 Localização**: `/components/WalkersPage.tsx`  
**🎯 Responsabilidade**: Página de listagem de passeadores  

**🔧 Funcionalidades**:
- Campo de busca
- Botão "Cadastrar Serviço"
- Filtros por:
  - Espécie aceita (cão, gato, aves, outros)
  - Distância
  - Preço
  - Avaliação
  - Disponibilidade
- Toggle lista/mapa
- Grid de cards de serviço (2 colunas em mobile, mais em desktop)

**📐 Layout do Card**:
```
┌──────────────────────┐
│                      │
│  [Foto do Serviço]   │
│                      │
├──────────────────────┤
│ Nome do Serviço      │
│ ⭐ 4.8 (120)         │
│ 📍 2.5 km            │
│ 💰 R$ 30-50          │
├──────────────────────┤
│ [WhatsApp] [Ligar]   │
└──────────────────────┘
```

**🎨 Padrão de Cores**:
- Primário: Roxo (`bg-purple-600`)
- Cards: Branco com sombra leve
- Border radius: `12px`

**🔍 Filtros Disponíveis**:
```typescript
interface FilterState {
  species: string[];        // ['dog', 'cat', 'bird', 'other']
  distance: number;         // em km
  priceRange: string;       // 'low', 'medium', 'high'
  rating: number;           // 0-5
  availability: boolean;    // disponível agora
}
```

---

### **9. WalkerProfilePage (Exemplo de Profile Page)**

**📍 Localização**: `/components/WalkerProfilePage.tsx`  
**🎯 Responsabilidade**: Página de perfil individual do passeador  

**🔧 Funcionalidades**:
- Header com foto e informações principais
- Galeria de fotos
- Avaliações e comentários
- Informações de contato
- Horários disponíveis
- Serviços oferecidos
- Preços
- Localização no mapa

**📐 Seções**:
1. **Hero Section**: Foto, nome, rating, localização
2. **Sobre**: Descrição do serviço
3. **Serviços**: Lista de serviços oferecidos
4. **Preços**: Tabela de preços
5. **Galeria**: Fotos do trabalho
6. **Avaliações**: Lista de reviews
7. **Localização**: Mapa
8. **Contato**: Botões de WhatsApp, telefone, etc

---

## 🔑 Custom Hooks

### **useAuth**
**📍 Localização**: `/hooks/useAuth.ts`  
**🎯 Responsabilidade**: Gerenciar autenticação  
**🔄 Retorno**:
```typescript
{
  user: User | null,
  authView: 'login' | 'register',
  isLoading: boolean,
  showWelcome: boolean,
  showWelcomeScreen: boolean,
  setAuthView: (view) => void,
  handleLogin: (userData) => void,
  handleRegister: (userData) => void,
  handleLogout: () => void,
  handleWelcomeComplete: () => void,
  handleWelcomeScreenStart: () => void,
  handleWelcomeScreenLogin: () => void,
}
```

---

### **useNavigation**
**📍 Localização**: `/hooks/useNavigation.ts`  
**🎯 Responsabilidade**: Gerenciar navegação por hash  
**🔄 Retorno**:
```typescript
{
  currentPage: PageType,
  setCurrentPage: (page: PageType) => void,
}
```

**🔧 Lógica**:
- Escuta mudanças no `window.location.hash`
- Mapeia hash para PageType
- Suporta rotas dinâmicas (ex: `lugar-123`, `passeador-456`)

---

### **usePosts**
**📍 Localização**: `/hooks/usePosts.ts`  
**🎯 Responsabilidade**: Gerenciar posts do feed  
**🔄 Retorno**:
```typescript
{
  posts: Post[],
  addPost: (newPost) => void,
  handleLikePost: (postId) => void,
  deletePost: (postId) => void,
  updatePost: (postId, updates) => void,
}
```

---

### **useResponsive**
**📍 Localização**: `/hooks/useResponsive.ts`  
**🎯 Responsabilidade**: Detectar tamanho da tela  
**🔄 Retorno**:
```typescript
{
  isMobile: boolean,      // < 768px
  isTablet: boolean,      // 768px - 1024px
  isDesktop: boolean,     // >= 1024px
  windowWidth: number,
}
```

---

## 📊 Fluxo de Dados

### **Criação de Post**
```
1. Usuário digita no campo de texto (MainContent)
2. Usuário seleciona imagens
3. Usuário seleciona pet (opcional)
4. Usuário clica em "Publicar"
5. MainContent chama onAddPost()
6. App.tsx recebe via usePosts.addPost()
7. Novo post é adicionado ao array de posts
8. Re-render do MainContent com novo post na lista
```

### **Curtir Post**
```
1. Usuário clica no botão de patinha (PostItem)
2. PostItem chama onLike(postId)
3. MainContent repassa para App.tsx
4. App.tsx chama usePosts.handleLikePost(postId)
5. Estado do post é atualizado (liked: true/false, likes: +1/-1)
6. Re-render do PostItem com novo estado
```

### **Navegação**
```
1. Usuário clica em item do menu (AppSidebar)
2. AppSidebar atualiza window.location.hash
3. useNavigation detecta mudança via hashchange event
4. currentPage é atualizado
5. PageRouter renderiza novo componente
```

---

## 🎨 Padrões de Design

### **Cores**
```css
/* Primária */
--purple-50: #faf5ff;
--purple-600: #9333ea;
--purple-700: #7e22ce;

/* Secundárias */
--gray-50: #f9fafb;
--gray-200: #e5e7eb;
--gray-600: #4b5563;
--gray-900: #111827;

/* Feedback */
--red-500: #ef4444;
--green-500: #10b981;
--blue-500: #3b82f6;
```

### **Espaçamento**
- Padding containers: `p-4` (16px) ou `p-6` (24px)
- Gap entre elementos: `gap-2` (8px), `gap-3` (12px), `gap-4` (16px)
- Margem entre sections: `mb-4` (16px) ou `mb-6` (24px)

### **Border Radius**
- Cards: `rounded-lg` (8px)
- Service cards: `rounded-xl` (12px)
- Botões: `rounded-lg` (8px)
- Avatares: `rounded-full` (100%)

### **Sombras**
- Cards: `shadow-sm`
- Cards hover: `hover:shadow-md`
- Modals: `shadow-lg`

---

## 🔧 Utilitários

### **StorageUtils**
**📍 Localização**: `/constants/storage.ts`  
**🎯 Métodos**:
```typescript
StorageUtils.saveUser(user)
StorageUtils.loadUser()
StorageUtils.removeUser()
StorageUtils.markWelcomeSeen()
StorageUtils.hasSeenWelcome()
StorageUtils.clearAll()
```

---

## 📝 Notas de Implementação

### **Ícones**
- Biblioteca: `lucide-react`
- Importação: `import { IconName } from 'lucide-react'`
- Ícone de like: Componente customizado `PawIcon` (patinha)

### **Imagens**
- Placeholder: Usar Unsplash via `unsplash_tool`
- Fallback: Componente `ImageWithFallback` para imagens que podem falhar

### **Responsividade**
- Breakpoints: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: >= 1024px
- Classes Tailwind: `md:`, `lg:`, `xl:`

### **Acessibilidade**
- Sempre usar `aria-label` em botões sem texto
- Usar `VisuallyHidden` para conteúdo screen-reader only
- Garantir contraste adequado (WCAG AA)

---

## 🔍 Debugging

### **Verificar Estado Atual**
```javascript
// No console do browser
localStorage.getItem('petslike_user')
window.location.hash
```

### **Forçar Re-render**
```javascript
// Adicionar key prop dinâmica
<Component key={Date.now()} />
```

### **Verificar Props**
```typescript
useEffect(() => {
  console.log('Props recebidas:', props);
}, [props]);
```

---

## 📞 Componentes de UI (ShadCN)

A aplicação usa componentes da biblioteca ShadCN em `/components/ui/`:

- `button.tsx` - Botões
- `input.tsx` - Campos de texto
- `sheet.tsx` - Sidebar mobile
- `dialog.tsx` - Modais
- `select.tsx` - Dropdowns
- `checkbox.tsx` - Checkboxes
- `slider.tsx` - Range sliders
- `avatar.tsx` - Avatares
- `badge.tsx` - Tags/badges
- E outros...

**Importação**:
```typescript
import { Button } from './components/ui/button';
import { Dialog } from './components/ui/dialog';
```

---

**Fim da Referência de Componentes** 📦
