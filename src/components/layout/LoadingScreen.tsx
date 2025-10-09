// ============================================
// COMPONENTE: TELA DE CARREGAMENTO
// ============================================

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* ========== SPINNER ANIMADO ========== */}
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        
        {/* ========== TEXTO DE CARREGAMENTO ========== */}
        <p className="text-gray-600">Carregando PetsLike...</p>
      </div>
    </div>
  );
}
