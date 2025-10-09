# 🔄 Exemplos Práticos: React → Angular

## 📋 Índice Rápido

1. [Componente Básico](#componente-básico)
2. [Estado e Propriedades](#estado-e-propriedades)
3. [Eventos e Callbacks](#eventos-e-callbacks)
4. [Listas e Condicionais](#listas-e-condicionais)
5. [Formulários](#formulários)
6. [HTTP Requests](#http-requests)
7. [Roteamento](#roteamento)
8. [Services](#services)

---

## 1️⃣ Componente Básico

### ⚛️ React

```typescript
// PostItem.tsx
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostItemProps {
  post: Post;
  onLike: (id: string) => void;
}

export function PostItem({ post, onLike }: PostItemProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button onClick={() => onLike(post.id)}>
        <Heart />
      </button>
    </div>
  );
}
```

### 🅰️ Angular

```typescript
// post-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {
  @Input() post!: Post;
  @Output() like = new EventEmitter<string>();

  onLike(): void {
    this.like.emit(this.post.id);
  }
}
```

```html
<!-- post-item.component.html -->
<div class="bg-white rounded-lg p-4 shadow">
  <h3>{{ post.title }}</h3>
  <p>{{ post.content }}</p>
  <button (click)="onLike()">
    <lucide-icon name="heart"></lucide-icon>
  </button>
</div>
```

---

## 2️⃣ Estado e Propriedades

### ⚛️ React

```typescript
// Counter.tsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

### 🅰️ Angular

```typescript
// counter.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  count = 0;
  name = '';

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }
}
```

```html
<!-- counter.component.html -->
<div>
  <h2>Count: {{ count }}</h2>
  <button (click)="increment()">+</button>
  <button (click)="decrement()">-</button>
  
  <input [(ngModel)]="name" />
  <p>Hello, {{ name }}!</p>
</div>
```

---

## 3️⃣ Eventos e Callbacks

### ⚛️ React - Parent/Child Communication

```typescript
// Parent.tsx
export function Parent() {
  const [message, setMessage] = useState('');

  const handleMessage = (msg: string) => {
    setMessage(msg);
  };

  return (
    <div>
      <Child onSendMessage={handleMessage} />
      <p>Received: {message}</p>
    </div>
  );
}

// Child.tsx
interface ChildProps {
  onSendMessage: (msg: string) => void;
}

export function Child({ onSendMessage }: ChildProps) {
  return (
    <button onClick={() => onSendMessage('Hello from child!')}>
      Send Message
    </button>
  );
}
```

### 🅰️ Angular - Parent/Child Communication

```typescript
// parent.component.ts
@Component({
  selector: 'app-parent',
  template: `
    <div>
      <app-child (sendMessage)="handleMessage($event)"></app-child>
      <p>Received: {{ message }}</p>
    </div>
  `
})
export class ParentComponent {
  message = '';

  handleMessage(msg: string): void {
    this.message = msg;
  }
}

// child.component.ts
@Component({
  selector: 'app-child',
  template: `
    <button (click)="sendMsg()">Send Message</button>
  `
})
export class ChildComponent {
  @Output() sendMessage = new EventEmitter<string>();

  sendMsg(): void {
    this.sendMessage.emit('Hello from child!');
  }
}
```

---

## 4️⃣ Listas e Condicionais

### ⚛️ React

```typescript
// PostList.tsx
interface PostListProps {
  posts: Post[];
  loading: boolean;
}

export function PostList({ posts, loading }: PostListProps) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div>
      {posts.map(post => (
        <PostItem 
          key={post.id} 
          post={post} 
        />
      ))}
    </div>
  );
}
```

### 🅰️ Angular

```typescript
// post-list.component.ts
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Input() loading = false;
}
```

```html
<!-- post-list.component.html -->
<div>
  <!-- Loading State -->
  <div *ngIf="loading">Loading...</div>

  <!-- Empty State -->
  <div *ngIf="!loading && posts.length === 0">
    No posts found
  </div>

  <!-- Posts List -->
  <div *ngIf="!loading && posts.length > 0">
    <app-post-item 
      *ngFor="let post of posts; trackBy: trackByPostId"
      [post]="post">
    </app-post-item>
  </div>
</div>
```

```typescript
// Método trackBy para performance
trackByPostId(index: number, post: Post): string {
  return post.id;
}
```

---

## 5️⃣ Formulários

### ⚛️ React - Controlled Component

```typescript
// LoginForm.tsx
export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Login:', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
```

### 🅰️ Angular - Reactive Forms

```typescript
// login-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
```

```html
<!-- login-form.component.html -->
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <div>
    <label>Email</label>
    <input formControlName="email" type="email" />
    
    <div *ngIf="email?.invalid && email?.touched">
      <span *ngIf="email?.errors?.['required']">
        Email é obrigatório
      </span>
      <span *ngIf="email?.errors?.['email']">
        Email inválido
      </span>
    </div>
  </div>

  <div>
    <label>Senha</label>
    <input formControlName="password" type="password" />
    
    <div *ngIf="password?.invalid && password?.touched">
      <span *ngIf="password?.errors?.['required']">
        Senha é obrigatória
      </span>
      <span *ngIf="password?.errors?.['minlength']">
        Mínimo 6 caracteres
      </span>
    </div>
  </div>

  <button type="submit" [disabled]="loginForm.invalid">
    Login
  </button>
</form>
```

---

## 6️⃣ HTTP Requests

### ⚛️ React - useEffect + fetch

```typescript
// PostsPage.tsx
import { useState, useEffect } from 'react';

export function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://api.example.com/posts');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### 🅰️ Angular - HttpClient + Observables

```typescript
// posts.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'https://api.example.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(id: string, post: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

```typescript
// posts-page.component.ts
@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html'
})
export class PostsPageComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error: string | null = null;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
```

```html
<!-- posts-page.component.html -->
<div>
  <div *ngIf="loading">Loading...</div>
  <div *ngIf="error">Error: {{ error }}</div>
  
  <app-post-item 
    *ngFor="let post of posts"
    [post]="post">
  </app-post-item>
</div>
```

---

## 7️⃣ Roteamento

### ⚛️ React - Hash-based Navigation

```typescript
// Current PetsLike approach
export function Sidebar() {
  const navigate = (hash: string) => {
    window.location.hash = hash;
  };

  return (
    <nav>
      <button onClick={() => navigate('')}>Feed</button>
      <button onClick={() => navigate('explorar')}>Explorar</button>
      <button onClick={() => navigate('perfil')}>Perfil</button>
    </nav>
  );
}

// useNavigation hook
export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState('feed');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'feed');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return { currentPage };
};
```

### 🅰️ Angular - Router

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'feed', component: FeedComponent },
  { path: 'explorar', component: ExplorarComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'perfil/:username', component: UserPerfilComponent },
  { path: 'posts/:id', component: PostDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

```typescript
// sidebar.component.ts
@Component({
  selector: 'app-sidebar',
  template: `
    <nav>
      <a routerLink="/feed" routerLinkActive="active">Feed</a>
      <a routerLink="/explorar" routerLinkActive="active">Explorar</a>
      <a routerLink="/perfil" routerLinkActive="active">Perfil</a>
    </nav>
  `
})
export class SidebarComponent {
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
```

```html
<!-- app.component.html -->
<div class="app-container">
  <app-sidebar></app-sidebar>
  <router-outlet></router-outlet>
</div>
```

**Navegação Programática**:
```typescript
// React
window.location.hash = 'perfil/usuario123';

// Angular
this.router.navigate(['/perfil', 'usuario123']);
// ou
this.router.navigate(['/perfil'], { 
  queryParams: { id: 'usuario123' } 
});
```

---

## 8️⃣ Services - Estado Global

### ⚛️ React - Custom Hook (usePosts)

```typescript
// hooks/usePosts.ts
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (newPost: Omit<Post, 'id'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
    };
    setPosts(prev => [post, ...prev]);
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const likePost = (id: string) => {
    setPosts(prev => prev.map(post =>
      post.id === id
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return { posts, addPost, deletePost, likePost };
};

// Usage in component
export function App() {
  const { posts, addPost, deletePost, likePost } = usePosts();

  return (
    <MainContent 
      posts={posts}
      onAdd={addPost}
      onDelete={deletePost}
      onLike={likePost}
    />
  );
}
```

### 🅰️ Angular - Service com RxJS

```typescript
// posts.service.ts
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  
  // Observable público para componentes se inscreverem
  posts$ = this.postsSubject.asObservable();

  addPost(newPost: Omit<Post, 'id'>): void {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
    };

    const currentPosts = this.postsSubject.value;
    this.postsSubject.next([post, ...currentPosts]);
  }

  deletePost(id: string): void {
    const posts = this.postsSubject.value.filter(post => post.id !== id);
    this.postsSubject.next(posts);
  }

  likePost(id: string): void {
    const posts = this.postsSubject.value.map(post => {
      if (post.id === id) {
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

  // Getter para valor atual (síncrono)
  getPosts(): Post[] {
    return this.postsSubject.value;
  }
}
```

```typescript
// main-content.component.ts
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit {
  posts$ = this.postsService.posts$;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    // Posts são automaticamente atualizados via Observable
  }

  addPost(post: Omit<Post, 'id'>): void {
    this.postsService.addPost(post);
  }

  deletePost(id: string): void {
    this.postsService.deletePost(id);
  }

  likePost(id: string): void {
    this.postsService.likePost(id);
  }
}
```

```html
<!-- main-content.component.html -->
<div>
  <!-- Async pipe se inscreve e cancela automaticamente -->
  <app-post-item
    *ngFor="let post of posts$ | async"
    [post]="post"
    (like)="likePost($event)"
    (delete)="deletePost($event)">
  </app-post-item>
</div>
```

---

## 🔄 Ciclo de Vida

### ⚛️ React Hooks

```typescript
export function MyComponent() {
  // componentDidMount + componentWillUnmount
  useEffect(() => {
    console.log('Component mounted');
    
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  // componentDidUpdate (quando dependency muda)
  useEffect(() => {
    console.log('Dependency changed');
  }, [dependency]);

  // Executado toda vez que componente renderiza
  useEffect(() => {
    console.log('Component rendered');
  });

  return <div>...</div>;
}
```

### 🅰️ Angular Lifecycle Hooks

```typescript
export class MyComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data: any;

  constructor() {
    // Executado quando componente é criado
    console.log('Constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Executado quando @Input muda
    console.log('Input changed:', changes);
  }

  ngOnInit(): void {
    // Executado após o componente ser inicializado
    console.log('Component initialized');
  }

  ngDoCheck(): void {
    // Executado a cada detecção de mudança
    console.log('Change detection ran');
  }

  ngAfterViewInit(): void {
    // Executado após a view ser inicializada
    console.log('View initialized');
  }

  ngOnDestroy(): void {
    // Executado antes do componente ser destruído
    console.log('Component will be destroyed');
  }
}
```

**Comparação**:

| React | Angular | Quando Usar |
|-------|---------|-------------|
| `useEffect(() => {}, [])` | `ngOnInit()` | Setup inicial |
| `useEffect(() => { return cleanup })` | `ngOnDestroy()` | Cleanup |
| `useEffect(() => {}, [dep])` | `ngOnChanges()` | Reagir a mudanças |
| `useMemo()` / `useCallback()` | Pure Pipes / Memoization | Otimização |

---

## 🎨 Estilização

### ⚛️ React - Tailwind CSS

```typescript
export function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
}
```

### 🅰️ Angular - Tailwind CSS + Component Styles

```typescript
// card.component.ts
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'] // Estilos opcionais encapsulados
})
export class CardComponent {
  @Input() title!: string;
}
```

```html
<!-- card.component.html -->
<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h2 class="text-xl font-semibold text-gray-900 mb-4">
    {{ title }}
  </h2>
  <div class="text-gray-600">
    <ng-content></ng-content>
  </div>
</div>
```

```scss
// card.component.scss (opcional - estilos encapsulados)
:host {
  display: block;
  
  // Estilos específicos não cobertos por Tailwind
  .special-element {
    custom-property: value;
  }
}
```

---

## 🧪 Testes

### ⚛️ React - Jest + React Testing Library

```typescript
// PostItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PostItem } from './PostItem';

describe('PostItem', () => {
  const mockPost: Post = {
    id: '1',
    title: 'Test Post',
    content: 'Test content',
    likes: 5,
    liked: false
  };

  it('renders post content', () => {
    render(<PostItem post={mockPost} onLike={() => {}} />);
    
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('calls onLike when like button is clicked', () => {
    const mockOnLike = jest.fn();
    render(<PostItem post={mockPost} onLike={mockOnLike} />);
    
    fireEvent.click(screen.getByRole('button', { name: /like/i }));
    
    expect(mockOnLike).toHaveBeenCalledWith('1');
  });
});
```

### 🅰️ Angular - Jasmine + Karma

```typescript
// post-item.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostItemComponent } from './post-item.component';

describe('PostItemComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostItemComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render post content', () => {
    component.post = {
      id: '1',
      title: 'Test Post',
      content: 'Test content',
      likes: 5,
      liked: false
    };
    
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Post');
    expect(compiled.textContent).toContain('Test content');
  });

  it('should emit like event when button is clicked', () => {
    component.post = { id: '1', /* ... */ };
    
    spyOn(component.like, 'emit');
    
    component.onLike();
    
    expect(component.like.emit).toHaveBeenCalledWith('1');
  });
});
```

---

## 💡 Dicas Finais

### **Diferenças Principais**

| Aspecto | React | Angular |
|---------|-------|---------|
| **Linguagem** | JavaScript/TypeScript (opcional) | TypeScript (obrigatório) |
| **Arquitetura** | Biblioteca + Escolha livre | Framework completo |
| **Estado** | useState, hooks | Propriedades da classe |
| **Reatividade** | Re-render on state change | Change Detection + RxJS |
| **Templates** | JSX (inline) | HTML separado |
| **Estilo** | CSS-in-JS, Tailwind, CSS Modules | Component styles, Tailwind |
| **Roteamento** | React Router (extra) | Angular Router (built-in) |
| **HTTP** | fetch, axios (extra) | HttpClient (built-in) |
| **Forms** | Controlled components | Reactive Forms (built-in) |
| **DI** | Context API, props | Dependency Injection nativo |

### **Quando Usar Cada Um**

**React**:
- Projetos menores
- Prototipagem rápida
- Liberdade de escolha de libs
- Equipe familiarizada com JavaScript

**Angular**:
- Aplicações empresariais grandes
- Equipes grandes
- Padrões estabelecidos necessários
- Aplicações que precisam escalar

---

**Happy Coding! 🚀**
