# 📘 Guia de Migração: React para Angular - PetsLike

## 📋 Índice

1. [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
2. [Estrutura de Pastas](#estrutura-de-pastas)
3. [Mapeamento de Conceitos](#mapeamento-de-conceitos)
4. [Componentes Principais](#componentes-principais)
5. [Serviços e Estado](#serviços-e-estado)
6. [Roteamento](#roteamento)
7. [Formulários e Validação](#formulários-e-validação)
8. [Estilização](#estilização)
9. [Checklist de Migração](#checklist-de-migração)

---

## 🏗️ Visão Geral da Arquitetura

### **Arquitetura Atual (React)**
```
App.tsx (Raiz)
├── Custom Hooks (useAuth, useNavigation, usePosts)
├── Components (Apresentação)
├── Layout Components (Sidebar, Header, Router)
└── Pages (Feed, Explorar, Serviços, etc)
```

### **Arquitetura Proposta (Angular)**
```
AppModule (Raiz)
├── Services (AuthService, NavigationService, PostsService)
├── Components (Apresentação)
├── Modules por Feature
│   ├── FeedModule
│   ├── ServicesModule
│   └── CommunityModule
├── Shared Module (Componentes compartilhados)
└── Core Module (Serviços singleton)
```

---

## 📁 Estrutura de Pastas

### **React (Atual)**
```
src/
├── components/
│   ├── layout/
│   ├── pages/
│   └── ui/
├── hooks/
├── types/
├── constants/
└── styles/
```

### **Angular (Proposto)**
```
src/
├── app/
│   ├── core/                    # Serviços singleton
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── navigation.service.ts
│   │   │   └── posts.service.ts
│   │   └── guards/
│   │       └── auth.guard.ts
│   ├── shared/                  # Componentes compartilhados
│   │   ├── components/
│   │   │   ├── sidebar/
│   │   │   ├── mobile-header/
│   │   │   └── loading-screen/
│   │   ├── pipes/
│   │   └── directives/
│   ├── features/                # Módulos por funcionalidade
│   │   ├── feed/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── feed.module.ts
│   │   ├── services/
│   │   │   ├── walkers/
│   │   │   ├── pet-shops/
│   │   │   └── services.module.ts
│   │   ├── community/
│   │   └── adoption/
│   ├── models/                  # Interfaces TypeScript
│   │   ├── user.model.ts
│   │   ├── post.model.ts
│   │   └── service-provider.model.ts
│   └── app-routing.module.ts
├── assets/
└── styles/
```

---

## 🔄 Mapeamento de Conceitos

### **React → Angular**

| React Concept | Angular Equivalent | Notas |
|--------------|-------------------|-------|
| `useState()` | Component Property + Change Detection | Angular usa change detection automático |
| `useEffect()` | Lifecycle Hooks (`ngOnInit`, `ngOnDestroy`) | Métodos específicos para cada ciclo |
| `useContext()` | Services + Dependency Injection | Services são singleton por padrão |
| Custom Hooks | Services | Lógica reutilizável em services |
| Props | `@Input()` decorator | Passa dados do pai para filho |
| Callbacks | `@Output()` + EventEmitter | Filho emite eventos para o pai |
| `children` prop | `<ng-content>` | Projeção de conteúdo |
| Conditional Rendering (`&&`, `?:`) | `*ngIf` directive | Diretiva estrutural |
| List Rendering (`.map()`) | `*ngFor` directive | Diretiva estrutural |
| CSS-in-JS / Tailwind | Component Styles + Global Styles | Styles encapsulados por componente |
| React Router | Angular Router | Sistema de roteamento oficial |
| localStorage | Angular Service | Encapsular em service |

---

## 🧩 Componentes Principais

### **1. App Component (App.tsx → app.component.ts)**

#### **React (Atual)**
```typescript
export default function App() {
  const auth = useAuth();
  const { currentPage } = useNavigation(!!auth.user);
  const { posts, addPost, handleLikePost } = usePosts();
  
  if (auth.isLoading) return <LoadingScreen />;
  if (!auth.user) return <LoginPage />;
  
  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />
      <PageRouter currentPage={currentPage} />
    </div>
  );
}
```

#### **Angular (Proposto)**
```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading$ = this.authService.isLoading$;
  user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.authService.initializeAuth();
  }
}
```

```html
<!-- app.component.html -->
<div class="flex h-screen bg-gray-50">
  <!-- Loading State -->
  <app-loading-screen *ngIf="isLoading$ | async"></app-loading-screen>

  <!-- Authenticated State -->
  <ng-container *ngIf="user$ | async as user; else authTemplate">
    <app-sidebar class="hidden md:block"></app-sidebar>
    <router-outlet></router-outlet>
  </ng-container>

  <!-- Unauthenticated State -->
  <ng-template #authTemplate>
    <router-outlet></router-outlet>
  </ng-template>
</div>
```

---

### **2. Sidebar Component**

#### **React (Atual)**
```typescript
export function AppSidebar({ onNavigate }: SidebarProps) {
  const [currentPage, setCurrentPage] = useState('feed');
  
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'feed');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="w-full md:w-64 h-full">
      {/* Menu items */}
    </div>
  );
}
```

#### **Angular (Proposto)**
```typescript
// sidebar.component.ts
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentPage$ = this.navigationService.currentPage$;
  isServicesOpen = false;
  
  menuItems = MENU_CONFIG; // Importado de constants

  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lógica de inicialização
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  toggleServices(): void {
    this.isServicesOpen = !this.isServicesOpen;
  }
}
```

```html
<!-- sidebar.component.html -->
<div class="w-full md:w-64 h-full md:h-screen bg-white border-r border-gray-200 flex flex-col">
  <!-- Logo -->
  <div class="p-6 flex items-center gap-2">
    <div class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
      <span class="text-white">❤️</span>
    </div>
    <span class="text-purple-600 font-semibold text-lg">Petslike</span>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 px-4">
    <div *ngFor="let item of menuItems" class="mb-1">
      <div 
        [class.bg-purple-50]="(currentPage$ | async) === item.page"
        [class.text-purple-600]="(currentPage$ | async) === item.page"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer"
        (click)="item.hasSubmenu ? toggleServices() : navigateTo(item.route)">
        
        <span>{{ item.label }}</span>
      </div>
    </div>
  </nav>
</div>
```

---

## 🔧 Serviços e Estado

### **3. Auth Service (useAuth → AuthService)**

#### **React Hook (Atual)**
```typescript
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = StorageUtils.loadUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    StorageUtils.saveUser(userData);
  };

  return { user, isLoading, handleLogin };
};
```

#### **Angular Service (Proposto)**
```typescript
// auth.service.ts
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Subjects privados
  private userSubject = new BehaviorSubject<User | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  // Observables públicos
  user$ = this.userSubject.asObservable();
  isLoading$ = this.loadingSubject.asObservable();
  isAuthenticated$ = this.user$.pipe(map(user => !!user));

  constructor(private storageService: StorageService) {}

  initializeAuth(): void {
    const storedUser = this.storageService.getUser();
    this.userSubject.next(storedUser);
    this.loadingSubject.next(false);
  }

  login(userData: User): Observable<void> {
    return new Observable(observer => {
      try {
        this.userSubject.next(userData);
        this.storageService.saveUser(userData);
        observer.next();
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  logout(): void {
    this.userSubject.next(null);
    this.storageService.removeUser();
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
}
```

---

### **4. Posts Service (usePosts → PostsService)**

#### **React Hook (Atual)**
```typescript
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (newPost: Omit<Post, 'id' | 'timestamp'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      timestamp: new Date(),
      likes: 0,
      liked: false
    };
    setPosts(prev => [post, ...prev]);
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return { posts, addPost, handleLikePost };
};
```

#### **Angular Service (Proposto)**
```typescript
// posts.service.ts
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  addPost(newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'liked'>): void {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false
    };

    const currentPosts = this.postsSubject.value;
    this.postsSubject.next([post, ...currentPosts]);
  }

  toggleLike(postId: string): void {
    const posts = this.postsSubject.value.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });

    this.postsSubject.next(posts);
  }

  deletePost(postId: string): void {
    const posts = this.postsSubject.value.filter(post => post.id !== postId);
    this.postsSubject.next(posts);
  }

  getPosts(): Observable<Post[]> {
    return this.posts$;
  }
}
```

---

## 🗺️ Roteamento

### **React Router (Hash-based)**
```typescript
// Navegação atual usa hash
window.location.hash = 'explorar';

// Leitura do hash
const hash = window.location.hash.slice(1);
```

### **Angular Router (Proposto)**

```typescript
// app-routing.module.ts
const routes: Routes = [
  // Rotas públicas
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },

  // Rotas protegidas
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: 'feed', component: FeedComponent },
      { path: 'explorar', component: ExplorarComponent },
      { path: 'adocao', component: AdocaoComponent },
      { path: 'comunidade', component: ComunidadeComponent },
      { path: 'lugares', component: LugaresComponent },
      { path: 'lugares/:id', component: LugarProfileComponent },
      
      // Serviços
      {
        path: 'servicos',
        children: [
          { path: 'passeadores', component: PasseadoresComponent },
          { path: 'passeadores/:id', component: PasseadorProfileComponent },
          { path: 'petshops', component: PetShopsComponent },
          { path: 'petshops/:id', component: PetShopProfileComponent },
          { path: 'clinicas', component: ClinicasComponent },
          { path: 'clinicas/:id', component: ClinicaProfileComponent },
          { path: 'adestradores', component: AdestradoresComponent },
          { path: 'adestradores/:id', component: AdestradorProfileComponent },
          { path: 'hospedagens', component: HospedagensComponent },
          { path: 'hospedagens/:id', component: HospedagemProfileComponent },
        ]
      },

      // Perfil
      { path: 'perfil', component: PerfilComponent },
      { path: 'perfil/:username', component: UserProfileComponent },
    ]
  },

  // Rota 404
  { path: '**', redirectTo: 'feed' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

### **Auth Guard**
```typescript
// auth.guard.ts
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
```

---

## 📝 Formulários e Validação

### **React (Atual)**
```typescript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Lógica de submit
};
```

### **Angular Reactive Forms (Proposto)**
```typescript
// login.component.ts
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: () => this.router.navigate(['/feed']),
        error: (err) => console.error('Erro no login:', err)
      });
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
```

```html
<!-- login.component.html -->
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <div>
    <label>Email</label>
    <input formControlName="email" type="email" />
    <div *ngIf="email?.invalid && email?.touched">
      <span *ngIf="email?.errors?.['required']">Email é obrigatório</span>
      <span *ngIf="email?.errors?.['email']">Email inválido</span>
    </div>
  </div>

  <div>
    <label>Senha</label>
    <input formControlName="password" type="password" />
    <div *ngIf="password?.invalid && password?.touched">
      <span *ngIf="password?.errors?.['required']">Senha é obrigatória</span>
      <span *ngIf="password?.errors?.['minlength']">Mínimo 6 caracteres</span>
    </div>
  </div>

  <button type="submit" [disabled]="loginForm.invalid">Login</button>
</form>
```

---

## 🎨 Estilização

### **Tailwind CSS**

O Tailwind CSS funciona perfeitamente com Angular. Configure no `angular.json`:

```json
{
  "projects": {
    "petslike": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles/globals.css"
            ]
          }
        }
      }
    }
  }
}
```

### **Component Styles**

Angular suporta encapsulamento de estilos por componente:

```typescript
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'], // Estilos encapsulados
  // ou
  styles: [`
    .sidebar {
      background: white;
    }
  `]
})
```

---

## ✅ Checklist de Migração

### **Fase 1: Estrutura Básica**
- [ ] Criar projeto Angular (`ng new petslike`)
- [ ] Configurar Tailwind CSS
- [ ] Criar estrutura de pastas (core, shared, features)
- [ ] Migrar modelos/interfaces TypeScript
- [ ] Configurar roteamento básico

### **Fase 2: Serviços Core**
- [ ] Criar AuthService
- [ ] Criar StorageService
- [ ] Criar NavigationService
- [ ] Criar PostsService
- [ ] Implementar AuthGuard

### **Fase 3: Componentes Shared**
- [ ] Migrar Sidebar
- [ ] Migrar MobileHeader
- [ ] Migrar LoadingScreen
- [ ] Migrar ErrorBoundary (ErrorHandler)
- [ ] Migrar componentes UI básicos

### **Fase 4: Features - Feed**
- [ ] Criar FeedModule
- [ ] Migrar MainContent component
- [ ] Migrar PostItem component
- [ ] Migrar PostDetailModal component
- [ ] Implementar criação de posts

### **Fase 5: Features - Serviços**
- [ ] Criar ServicesModule
- [ ] Migrar WalkersPage
- [ ] Migrar PetShopsPage
- [ ] Migrar VetClinicsPage
- [ ] Migrar TrainersPage
- [ ] Migrar HousingsPage
- [ ] Migrar páginas de perfil de cada serviço

### **Fase 6: Features - Outros**
- [ ] Migrar ExplorePage
- [ ] Migrar AdoptionPage
- [ ] Migrar CommunityPage
- [ ] Migrar PlacesPage
- [ ] Migrar páginas de perfil

### **Fase 7: Autenticação**
- [ ] Migrar LoginPage
- [ ] Migrar RegisterPage
- [ ] Migrar WelcomePage
- [ ] Migrar WelcomeScreen
- [ ] Implementar fluxo completo de auth

### **Fase 8: Testes e Polimento**
- [ ] Testes unitários dos services
- [ ] Testes de componentes
- [ ] Testes E2E das principais flows
- [ ] Performance optimization
- [ ] Acessibilidade (a11y)

---

## 📚 Recursos Adicionais

### **Documentação Oficial**
- [Angular Docs](https://angular.io/docs)
- [RxJS Docs](https://rxjs.dev/)
- [Angular Router](https://angular.io/guide/router)
- [Reactive Forms](https://angular.io/guide/reactive-forms)

### **Ferramentas Úteis**
- [Angular CLI](https://angular.io/cli)
- [Angular DevTools](https://angular.io/guide/devtools)
- [NgRx](https://ngrx.io/) - Se precisar de state management mais robusto

### **Migração Incremental**
Considere usar [Micro Frontends](https://single-spa.js.org/) ou [Module Federation](https://webpack.js.org/concepts/module-federation/) se precisar migrar gradualmente.

---

## 💡 Dicas Importantes

1. **RxJS é seu amigo**: Aprenda Observables, eles são fundamentais no Angular
2. **Change Detection**: Entenda como funciona para otimizar performance
3. **Dependency Injection**: Use services para compartilhar lógica
4. **OnPush Strategy**: Use para melhorar performance em listas grandes
5. **Lazy Loading**: Carregue módulos sob demanda
6. **Type Safety**: Aproveite o TypeScript ao máximo

---

## 🆘 Ajuda e Suporte

Se tiver dúvidas durante a migração:
- Consulte este guia
- Verifique a documentação oficial do Angular
- Compare com o código React original
- Use o Angular CLI para gerar código boilerplate

**Boa sorte com a migração! 🚀**
