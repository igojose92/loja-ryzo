import React, { useState, useEffect } from 'react';

function App() {
  const [hover, setHover] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'search', 'category', 'account'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openSubMenu, setOpenSubMenu] = useState(null); // Para controlar submenus (ex: Mulher -> Bolsas)
  
  // Estados de Autenticação e Cliente
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [activeAccountTab, setActiveAccountTab] = useState('visao-geral');

  // Estados para controlar o hover dos itens específicos do menu e da conta
  const [hoverCategory, setHoverCategory] = useState(null);
  const [hoverCloseMenu, setHoverCloseMenu] = useState(false);
  const [hoverAccountTab, setHoverAccountTab] = useState(null);
  const [hoverCloseAccount, setHoverCloseAccount] = useState(false);
  const [hoverSubCategory, setHoverSubCategory] = useState(null);

  // Monitora o scroll da página para fixar o cabeçalho ao rolar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sincroniza a navegação com o botão "Voltar" e "Avançar" do navegador
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        setCurrentView(event.state.view || 'home');
        setSearchTerm(event.state.search || '');
        setSelectedCategory(event.state.category || '');
        setIsMenuOpen(false);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Funções de navegação que atualizam o histórico do navegador
  const openSearch = () => {
    window.history.pushState({ view: 'search', search: searchTerm }, '', '#busca');
    setCurrentView('search');
    setIsMenuOpen(false);
  };

  const openCategory = (categoryName) => {
    window.history.pushState({ view: 'category', category: categoryName }, '', `#${categoryName.toLowerCase()}`);
    setCurrentView('category');
    setSelectedCategory(categoryName);
    setIsMenuOpen(false);
  };

  const openAccount = () => {
    window.history.pushState({ view: 'account' }, '', '#conta');
    setCurrentView('account');
    setIsMenuOpen(false);
  };

  const goHome = () => {
    window.history.pushState({ view: 'home' }, '', window.location.pathname);
    setCurrentView('home');
    setSearchTerm('');
    setIsMenuOpen(false);
  };

  // Login tradicional por formulário
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginInput) {
      setUserEmail(loginInput);
      setIsLoggedIn(true);
    }
  };

  // Cadastro/Login automático via Google
  const handleGoogleLogin = () => {
    setUserEmail('cliente.google@gmail.com');
    setIsLoggedIn(true);
  };

  // Cadastro/Login automático via Apple
  const handleAppleLogin = () => {
    setUserEmail('cliente.apple@icloud.com');
    setIsLoggedIn(true);
  };

  // Produtos mais vendidos para a busca
  const popularProducts = [
    { id: 1, name: 'Bolsa Clássica RZ', price: 'R$ 12.500,00', image: '/bolsa 1.png' },
    { id: 2, name: 'Óculos de Sol', price: 'R$ 3.600,00', image: '/baner site.png' },
    { id: 3, name: 'Perfume Signature', price: 'R$ 1.850,00', image: '/baner site.png' },
    { id: 4, name: 'Tênis Casual', price: 'R$ 7.050,00', image: '/baner site.png' }
  ];

  const accountTabs = [
    { id: 'visao-geral', label: 'Visão Geral' },
    { id: 'perfil', label: 'Meu Perfil' },
    { id: 'pedidos', label: 'Meus Pedidos' },
    { id: 'desejos', label: 'Lista de Desejos' },
    { id: 'atendimentos', label: 'Atendimentos Privados' },
    { id: 'reparos', label: 'Serviço de Reparos' }
  ];

  return (
    <div style={{ 
      fontFamily: '"Agatho", Helvetica, Arial, sans-serif', 
      color: '#0F2F25', 
      margin: 0, 
      padding: 0, 
      backgroundColor: '#ffffff', 
      minHeight: '100vh', 
      userSelect: 'none',
      overflowX: 'hidden'
    }}>
      
      {/* Importação de fontes, regras globais e Media Queries para Responsividade em Celulares/Tablets */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400;500;600&display=swap');
        
        @font-face {
          font-family: 'Agatho';
          src: local('Agatho'), url('https://fonts.cdnfonts.com/s/34327/Agatho.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }

        body, input, button, span, h1, h2, h3, h4, h5, h6, p {
          font-family: 'Agatho', 'Cinzel', Helvetica, Arial, sans-serif !important;
          color: #0F2F25;
        }

        /* Ajustes responsivos para telas menores (Celulares e Tablets) */
        @media (max-width: 768px) {
          header {
            padding: 8px 12px !important;
            height: 70px !important;
            gap: 6px !important;
          }
          .site-logo {
            height: 45px !important;
          }
          .desktop-hide-text {
            display: none !important;
          }
          .side-menu {
            width: 100% !important;
            left: ${isMenuOpen ? '0' : '-100%'} !important;
            padding: 20px 30px !important;
          }
          .main-content-padding {
            padding: 90px 15px 40px 15px !important;
          }
          .account-drawer {
            width: 100% !important;
          }
          .mobile-search-input-wrapper {
            max-width: 170px !important;
            padding: 6px 10px !important;
          }
          .mobile-close-btn {
            font-size: 12px !important;
            white-space: nowrap !important;
          }
          /* Ajuste automático dos banners no celular para exibição completa */
          .responsive-banner {
            height: auto !important;
            min-height: 250px;
            max-height: 400px;
            object-fit: contain !important;
            background-color: #000;
          }
        }
      `}</style>
      
      {/* 1. Menu Lateral */}
      <div className="side-menu" style={{ 
        position: 'fixed', 
        top: 0, 
        left: isMenuOpen ? 0 : '-450px', 
        width: '400px', 
        height: '100%', 
        backgroundColor: '#fff', 
        zIndex: 40, 
        transition: 'all 0.4s ease', 
        boxShadow: isMenuOpen ? '5px 0 25px rgba(15,47,37,0.15)' : 'none',
        padding: '30px 50px 50px 50px', 
        opacity: isMenuOpen ? 1 : 0, 
        pointerEvents: isMenuOpen ? 'all' : 'none',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowY: 'auto'
      }}>
        {/* Cabeçalho do Menu */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
          <div 
            onClick={() => setIsMenuOpen(false)} 
            onMouseEnter={() => setHoverCloseMenu(true)}
            onMouseLeave={() => setHoverCloseMenu(false)}
            style={{ 
              cursor: 'pointer', 
              fontSize: '24px', 
              color: '#0F2F25',
              transform: hoverCloseMenu ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.3s ease',
              lineHeight: '16px'
            }}
          >
            ✕
          </div>
        </div>

        {/* Lista de Categorias com Submenu para Mulher -> Bolsas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '16px', flexGrow: 1, marginTop: '10px' }}>
          {['Novidades', 'Mulher', 'Homem', 'Óculos', 'Relógios & Joias', 'Compra e Manutenção'].map((cat) => (
            <div key={cat} style={{ display: 'flex', flexDirection: 'column' }}>
              <span 
                onClick={() => {
                  if (cat === 'Mulher') {
                    setOpenSubMenu(openSubMenu === 'Mulher' ? null : 'Mulher');
                  } else {
                    openCategory(cat);
                  }
                }} 
                onMouseEnter={() => setHoverCategory(cat)}
                onMouseLeave={() => setHoverCategory(null)}
                style={{ 
                  cursor: 'pointer',
                  color: '#0F2F25',
                  transform: hoverCategory === cat ? 'scale(1.03)' : 'scale(1)',
                  transformOrigin: 'left center',
                  transition: 'all 0.3s ease',
                  fontWeight: hoverCategory === cat ? '600' : '400',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {cat}
                {cat === 'Mulher' && (
                  <span style={{ fontSize: '12px', color: '#0F2F25' }}>{openSubMenu === 'Mulher' ? '−' : '+'}</span>
                )}
              </span>

              {/* Subcategoria Bolsas dentro de Mulher */}
              {cat === 'Mulher' && openSubMenu === 'Mulher' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '20px', marginTop: '15px' }}>
                  <span 
                    onClick={() => openCategory('Bolsas')}
                    onMouseEnter={() => setHoverSubCategory('Bolsas')}
                    onMouseLeave={() => setHoverSubCategory(null)}
                    style={{ 
                      cursor: 'pointer', 
                      fontSize: '14px', 
                      color: '#0F2F25',
                      opacity: hoverSubCategory === 'Bolsas' ? '1' : '0.8',
                      transform: hoverSubCategory === 'Bolsas' ? 'scale(1.03)' : 'scale(1)',
                      transformOrigin: 'left center',
                      transition: 'all 0.3s ease',
                      fontWeight: hoverSubCategory === 'Bolsas' ? '600' : '400'
                    }}
                  >
                    Bolsas
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Rodapé do Menu */}
        <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '30px', marginTop: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#0F2F25', opacity: 0.8, marginBottom: '30px' }}>
            <span onClick={() => { setIsMenuOpen(false); openAccount(); }} style={{ cursor: 'pointer' }}>Configurar o seu Perfil</span>
            <span style={{ cursor: 'pointer' }}>Localizador de Lojas</span>
          </div>
          <div style={{ fontSize: '12px', color: '#0F2F25', opacity: 0.6, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span>🌐 Brasil</span>
            <span style={{ fontWeight: '600', letterSpacing: '2px', color: '#0F2F25', fontSize: '16px' }}>RYZO</span>
          </div>
        </div>
      </div>

      {/* 2. Cabeçalho Fixo */}
      <header 
        onMouseEnter={() => setHover(true)} 
        onMouseLeave={() => setHover(false)}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '10px 50px', 
          height: '100px', 
          position: 'fixed', 
          top: 0, 
          width: '100%', 
          boxSizing: 'border-box', 
          backgroundColor: isMenuOpen || currentView === 'search' || hover || isScrolled ? '#0F2F25' : 'transparent', 
          transition: 'all 0.4s ease', 
          zIndex: 35,
          borderBottom: currentView === 'search' ? '1px solid rgba(255,255,255,0.1)' : 'none'
        }}
      >
        <div style={{ display: 'flex', gap: '20px', color: '#fff', alignItems: 'center' }}>
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <line x1="0" y1="1" x2="18" y2="1" />
              <line x1="0" y1="6" x2="18" y2="6" />
              <line x1="0" y1="11" x2="18" y2="11" />
            </svg>
            {!isMenuOpen && (
              <span className="desktop-hide-text" style={{ fontSize: '14px', letterSpacing: '0.5px', fontWeight: '300', color: '#fff' }}>Menu</span>
            )}
          </div>

          {currentView !== 'search' && !isMenuOpen && (
            <div onClick={openSearch} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="desktop-hide-text" style={{ fontSize: '14px', letterSpacing: '0.5px', fontWeight: '300', color: '#fff' }}>Buscar</span>
            </div>
          )}
        </div>

        {currentView === 'search' ? (
          <div className="mobile-search-input-wrapper" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#ffffff', 
            borderRadius: '50px', 
            padding: '8px 15px', 
            width: '100%',
            maxWidth: '450px',
            margin: '0 auto',
            border: '1px solid #ddd',
            boxSizing: 'border-box'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F2F25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              style={{ 
                width: '100%', 
                border: 'none', 
                outline: 'none', 
                background: 'transparent',
                fontSize: '14px', 
                color: '#0F2F25'
              }} 
            />
          </div>
        ) : (
          <div onClick={goHome} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}>
            <img className="site-logo" src="/ryzo-logo-transparente.png" alt="RYZO" style={{ height: '80px', objectFit: 'contain' }} />
          </div>
        )}

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: '#fff' }}>
          {currentView === 'search' ? (
            <span 
              className="mobile-close-btn"
              onClick={goHome} 
              style={{ fontSize: '14px', letterSpacing: '0.5px', fontWeight: '500', cursor: 'pointer', color: '#fff', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              FECHAR ✕
            </span>
          ) : (
            <>
              <span className="desktop-hide-text" style={{ fontSize: '14px', letterSpacing: '0.5px', fontWeight: '300', cursor: 'pointer', color: '#fff' }}>Fale Conosco</span>
              <div onClick={openAccount} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#fff' }} title="Minha Conta">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </>
          )}
        </div>
      </header>

      {/* 3. Conteúdo Dinâmico Baseado na Página Atual */}
      {currentView === 'home' && (
        <main style={{ width: '100%' }}>
          {/* Primeiro Banner Principal */}
          <section style={{ height: '100vh', width: '100%', position: 'relative' }}>
            <img className="responsive-banner" src="/baner site.png" alt="Banner RYZO" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', top: '50%', left: '20px', cursor: 'pointer', color: '#fff', fontSize: '40px', transform: 'translateY(-50%)' }}>&#10094;</div>
            <div style={{ position: 'absolute', top: '50%', right: '20px', cursor: 'pointer', color: '#fff', fontSize: '40px', transform: 'translateY(-50%)' }}>&#10095;</div>
          </section>

          {/* Frase de Transição */}
          <div style={{ 
            width: '100%', 
            padding: '50px 0', 
            backgroundColor: '#ffffff', 
            textAlign: 'center' 
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '300', 
              letterSpacing: '4px', 
              textTransform: 'uppercase', 
              color: '#0F2F25',
              margin: 0 
            }}>
              Descubra o novo
            </h2>
          </div>

          {/* Segundo Banner com Vídeo */}
          <section className="responsive-banner" style={{ height: '90vh', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#111' }}>
            <img 
              className="responsive-banner"
              src="/baner site.png" 
              alt="Fallback Vídeo" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} 
            />

            <video 
              className="responsive-banner"
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="auto"
              ref={(el) => {
                if (el) {
                  el.play().catch(error => console.log("Erro ao reproduzir o vídeo:", error));
                }
              }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 2 }}
            >
              <source src="/video_banner.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </section>
        </main>
      )}

      {currentView === 'search' && (
        <div className="main-content-padding" style={{ padding: '140px 80px 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', color: '#0F2F25', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>Pesquisas em alta:</span>
            {['bolsa', 'speedy', 'neverfull', 'lvrio', 'alma bb'].map((tag) => (
              <span 
                key={tag} 
                onClick={() => setSearchTerm(tag)}
                style={{ fontSize: '13px', backgroundColor: '#f2f2f2', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', color: '#0F2F25' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: '#0F2F25' }}>Mais Vendidos</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '30px' }}>
            {popularProducts
              .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(product => (
                <div key={product.id} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ backgroundColor: '#f9f9f9', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#0F2F25' }}>{product.name}</span>
                  <span style={{ fontSize: '14px', color: '#0F2F25', opacity: 0.8 }}>{product.price}</span>
                </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'category' && (
        <div className="main-content-padding" style={{ padding: '140px 80px 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            style={{ 
              fontSize: '28px', 
              fontWeight: '300', 
              marginBottom: '40px', 
              textAlign: 'center', 
              letterSpacing: '2px', 
              textTransform: 'uppercase', 
              color: '#0F2F25',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              transformOrigin: 'center center'
            }}
          >
            {selectedCategory === 'Bolsas' ? 'Bolsas de Luxo' : `Categoria: ${selectedCategory}`}
          </h1>

          {/* Se a categoria selecionada for "Bolsas", exibimos as fotos das bolsas com nome e descrição estilizados */}
          {selectedCategory === 'Bolsas' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
              <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ backgroundColor: '#f9f9f9', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px' }}>
                  <img src="/bolsa 1.png" alt="Bolsa Clássica RZ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span 
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      style={{ 
                        fontSize: '15px', 
                        fontWeight: '500', 
                        letterSpacing: '0.5px', 
                        color: '#0F2F25',
                        transition: 'transform 0.3s ease',
                        transformOrigin: 'left center',
                        display: 'inline-block'
                      }}
                    >
                      Bolsa Signature RZ
                    </span>
                    <span style={{ fontSize: '14px', color: '#0F2F25', fontWeight: '600' }}>R$ 12.500,00</span>
                  </div>
                  <span 
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    style={{ 
                      fontSize: '12px', 
                      color: '#0F2F25', 
                      opacity: '0.7', 
                      fontStyle: 'italic',
                      transition: 'transform 0.3s ease',
                      transformOrigin: 'left center',
                      display: 'inline-block'
                    }}
                  >
                    Couro nobre texturizado com fecho exclusivo em monograma dourado.
                  </span>
                </div>
              </div>

              <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ backgroundColor: '#f9f9f9', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px' }}>
                  <img src="/bolsa 2.png" alt="Bolsa Elegance RZ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span 
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      style={{ 
                        fontSize: '15px', 
                        fontWeight: '500', 
                        letterSpacing: '0.5px', 
                        color: '#0F2F25',
                        transition: 'transform 0.3s ease',
                        transformOrigin: 'left center',
                        display: 'inline-block'
                      }}
                    >
                      Bolsa Elegance RZ
                    </span>
                    <span style={{ fontSize: '14px', color: '#0F2F25', fontWeight: '600' }}>R$ 13.200,00</span>
                  </div>
                  <span 
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    style={{ 
                      fontSize: '12px', 
                      color: '#0F2F25', 
                      opacity: '0.7', 
                      fontStyle: 'italic',
                      transition: 'transform 0.3s ease',
                      transformOrigin: 'left center',
                      display: 'inline-block'
                    }}
                  >
                    Design contemporâneo estruturado com acabamento de alta sofisticação.
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#0F2F25', opacity: '0.7', fontSize: '16px' }}>Produtos da categoria {selectedCategory} aparecerão aqui em breve.</p>
            </div>
          )}
        </div>
      )}

      {/* 4. Tela de Identificação / Login e Área do Cliente */}
      {currentView === 'account' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 50, display: 'flex' }}>
          <div onClick={goHome} style={{ flex: 1, backgroundColor: 'rgba(15,47,37,0.4)', backdropFilter: 'blur(2px)' }}></div>

          <div className="account-drawer" style={{ width: '550px', backgroundColor: '#fff', height: '100%', overflowY: 'auto', padding: '50px', boxSizing: 'border-box', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <div 
                onClick={goHome} 
                onMouseEnter={() => setHoverCloseAccount(true)}
                onMouseLeave={() => setHoverCloseAccount(false)}
                style={{ 
                  cursor: 'pointer', 
                  fontSize: '22px', 
                  color: '#0F2F25',
                  transform: hoverCloseAccount ? 'scale(1.2)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
              >
                ✕
              </div>
            </div>

            {!isLoggedIn ? (
              <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '400', marginBottom: '30px', letterSpacing: '0.5px', color: '#0F2F25' }}>Identificação</h2>

                <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '15px', color: '#0F2F25' }}>Já possuo uma conta</h3>

                <button 
                  onClick={handleGoogleLogin}
                  style={{ 
                    width: '100%', padding: '12px', border: '1px solid #0F2F25', borderRadius: '30px', backgroundColor: '#fff', 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', marginBottom: '12px',
                    color: '#0F2F25', transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f4f9f7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                  Fazer Login com Google
                </button>

                <button 
                  onClick={handleAppleLogin}
                  style={{ 
                    width: '100%', padding: '12px', border: '1px solid #0F2F25', borderRadius: '30px', backgroundColor: '#fff', 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', marginBottom: '30px',
                    color: '#0F2F25', transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f4f9f7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.83 5.37c.57-.69 0.96-1.65.85-2.62-.84.03-1.87.56-2.46 1.25-.53.6-1 1.57-.87 2.53 0.95.07 1.91-.48 2.48-1.16z"/></svg>
                  Iniciar Sessão com a Apple
                </button>

                <div style={{ textAlign: 'center', color: '#0F2F25', opacity: 0.6, fontSize: '12px', margin: '20px 0', position: 'relative' }}>
                  <span style={{ backgroundColor: '#fff', padding: '0 10px', position: 'relative', zIndex: 1 }}>ou</span>
                  <hr style={{ position: 'absolute', top: '50%', left: 0, width: '100%', border: 'none', borderTop: '1px solid #eaeaea', margin: 0 }} />
                </div>

                <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '11px', color: '#0F2F25', opacity: 0.7 }}>Campos Obrigatórios*</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', color: '#0F2F25' }}>Login*</label>
                    <input 
                      type="text" 
                      required
                      placeholder="E-mail ou Telefone"
                      value={loginInput}
                      onChange={(e) => setLoginInput(e.target.value)}
                      style={{ padding: '12px', border: '1px solid #0F2F25', borderRadius: '4px', fontSize: '14px', outline: 'none', color: '#0F2F25' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', color: '#0F2F25' }}>Senha*</label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      style={{ padding: '12px', border: '1px solid #0F2F25', borderRadius: '4px', fontSize: '14px', outline: 'none', color: '#0F2F25' }}
                    />
                  </div>

                  <span style={{ fontSize: '12px', color: '#0F2F25', textDecoration: 'underline', cursor: 'pointer' }}>Esqueceu sua senha?</span>

                  <button 
                    type="submit" 
                    style={{ 
                      padding: '14px', backgroundColor: '#0F2F25', color: '#fff', border: 'none', borderRadius: '30px', 
                      cursor: 'pointer', fontSize: '14px', fontWeight: '500', letterSpacing: '1px', marginTop: '10px',
                      transition: 'background 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#163d30'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F2F25'}
                  >
                    Entrar
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '20px', color: '#0F2F25' }}>Área do Cliente</h2>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                  {accountTabs.map((tab) => (
                    <span 
                      key={tab.id}
                      onClick={() => setActiveAccountTab(tab.id)}
                      onMouseEnter={() => setHoverAccountTab(tab.id)}
                      onMouseLeave={() => setHoverAccountTab(null)}
                      style={{ 
                        fontSize: '13px', 
                        padding: '8px 12px',
                        cursor: 'pointer',
                        color: activeAccountTab === tab.id || hoverAccountTab === tab.id ? '#0F2F25' : '#666',
                        transform: hoverAccountTab === tab.id ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                        fontWeight: activeAccountTab === tab.id ? '600' : '400',
                        borderBottom: activeAccountTab === tab.id ? '2px solid #0F2F25' : 'none'
                      }}
                    >
                      {tab.label}
                    </span>
                  ))}
                </div>

                <div style={{ flex: 1 }}>
                  {activeAccountTab === 'visao-geral' && (
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: '500', color: '#0F2F25' }}>Bem-vindo(a), {userEmail}!</p>
                      <p style={{ color: '#0F2F25', opacity: 0.7, fontSize: '14px' }}>Conta criada e conectada com sucesso. Aqui você pode gerenciar suas informações e acompanhar seus pedidos.</p>
                    </div>
                  )}
                  {activeAccountTab === 'perfil' && (
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '400', marginBottom: '10px', color: '#0F2F25' }}>Meu Perfil</h3>
                      <p style={{ color: '#0F2F25', opacity: 0.8, fontSize: '14px' }}><b>Conta vinculada:</b> {userEmail}</p>
                    </div>
                  )}
                  {activeAccountTab === 'pedidos' && (
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '400', marginBottom: '10px', color: '#0F2F25' }}>Meus Pedidos</h3>
                      <p style={{ color: '#0F2F25', opacity: 0.7, fontSize: '14px' }}>Nenhum pedido recente encontrado.</p>
                    </div>
                  )}
                  {activeAccountTab === 'desejos' && (
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '400', marginBottom: '10px', color: '#0F2F25' }}>Lista de Desejos</h3>
                      <p style={{ color: '#0F2F25', opacity: 0.7, fontSize: '14px' }}>Sua lista está vazia.</p>
                    </div>
                  )}
                  {activeAccountTab=== 'atendimentos' && (
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '400', marginBottom: '10px', color: '#0F2F25' }}>Atendimentos Privados</h3>
                      <p style={{ color: '#0F2F25', opacity: 0.7, fontSize: '14px' }}>Fale com um de nossos consultores.</p>
                    </div>
                  )}
                  {activeAccountTab === 'reparos' && (
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '400', marginBottom: '10px', color: '#0F2F25' }}>Serviço de Reparos</h3>
                      <p style={{ color: '#0F2F25', opacity: 0.7, fontSize: '14px' }}>Solicite suporte para seus artigos.</p>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setIsLoggedIn(false)}
                  style={{ padding: '10px', backgroundColor: '#f2f2f2', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', marginTop: 'auto', color: '#0F2F25' }}
                >
                  Sair da conta
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default App;