import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Pet, Post, User } from '../../../../models';

@Component({
  selector: 'app-feed-composer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './feed-composer.component.html',
  styleUrl: './feed-composer.component.scss'
})
export class FeedComposerComponent {
  @Input({ required: true }) user!: User;
  @Input() pets: Pet[] = [];
  @Output() postCreated = new EventEmitter<Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares' | 'liked'>>();

  readonly isDialogOpen = signal(false);
  readonly selectedImages = signal<string[]>([]);
  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(420)]],
      petId: ['']
    });
  }

  openDialog(): void {
    this.isDialogOpen.set(true);
  }

  closeDialog(): void {
    this.isDialogOpen.set(false);
    this.form.reset();
    this.selectedImages.set([]);
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files?.length) {
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = typeof reader.result === 'string' ? reader.result : '';
        if (result) {
          this.selectedImages.update(images => [...images, result]);
        }
      };
      reader.readAsDataURL(file);
    });

    target.value = '';
  }

  removeImage(index: number): void {
    this.selectedImages.update(images => images.filter((_, i) => i !== index));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { text, petId } = this.form.value;
    const pet = this.pets.find(item => item.id === petId);

    this.postCreated.emit({
      text: text ?? '',
      images: this.selectedImages(),
      petId: pet?.id,
      petName: pet?.name,
      petType: pet?.type,
      petImage: pet?.image,
      author: {
        name: this.user.name,
        image: this.user.image,
        username: this.user.username
      }
    });

    this.closeDialog();
  }
}
