// Inicia a página no topo para apresentar a home ao visitante; respeita links internos com âncora.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('pageshow', () => {
  if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});

// Cabeçalho compacto ao rolar: preserva o acesso à navegação sem ocupar tanto espaço.
const siteHeader = document.querySelector('.header');
const updateHeader = () => {
  if (siteHeader) siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    }
  });
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Painel de detalhes dos serviços com abertura de WhatsApp já contextualizada.
const serviceDetails = {
  computadores: {
    title: 'Computadores e notebooks',
    description: 'Atendimento para identificar falhas, melhorar o funcionamento e manter seu equipamento confiável no dia a dia.',
    items: ['Diagnóstico de lentidão, travamentos e falhas.', 'Manutenção preventiva, limpeza e configuração.', 'Instalação e configuração de programas e sistema operacional.', 'Orientação clara sobre reparo e próximos passos.'],
    message: 'Olá, Taysson! Vim pelo site da LUMEM e gostaria de atendimento para computador ou notebook.'
  },
  upgrade: {
    title: 'Upgrade e desempenho',
    description: 'Avaliação de melhorias para deixar o computador mais rápido e prolongar sua vida útil, sem trocar de equipamento sem necessidade.',
    items: ['Instalação ou substituição de SSD.', 'Expansão ou atualização de memória RAM.', 'Avaliação de compatibilidade dos componentes.', 'Orientação sobre custo-benefício antes de investir.'],
    message: 'Olá, Taysson! Vim pelo site da LUMEM e gostaria de avaliar um upgrade para meu computador ou notebook.'
  },
  redes: {
    title: 'Redes e infraestrutura',
    description: 'Configuração e suporte para uma conexão estável e uma estrutura de rede adequada à sua casa ou empresa.',
    items: ['Configuração e diagnóstico de Wi-Fi e rede local.', 'Organização e verificação de cabeamento e conectividade.', 'Configuração de equipamentos de rede.', 'Identificação de falhas e orientação para melhorar a estabilidade.'],
    message: 'Olá, Taysson! Vim pelo site da LUMEM e preciso de ajuda com redes ou infraestrutura de TI.'
  },
  seguranca: {
    title: 'Segurança da informação',
    description: 'Orientações práticas para reduzir riscos, proteger informações e ajudar pessoas e equipes a usar a tecnologia com mais segurança.',
    items: ['Boas práticas para senhas e autenticação.', 'Orientação sobre golpes, phishing e arquivos suspeitos.', 'Cuidados com backups e proteção de dados.', 'Recomendações de segurança adequadas ao cenário.'],
    message: 'Olá, Taysson! Vim pelo site da LUMEM e gostaria de conversar sobre segurança da informação.'
  },
  empresas: {
    title: 'Suporte para empresas',
    description: 'Apoio técnico para que computadores, usuários e infraestrutura acompanhem a rotina de trabalho da empresa.',
    items: ['Suporte a computadores, sistemas e usuários.', 'Manutenção e orientação para reduzir interrupções.', 'Apoio em redes e ambiente de trabalho.', 'Conversa inicial para entender a operação e as prioridades.'],
    message: 'Olá, Taysson! Vim pelo site da LUMEM e gostaria de conversar sobre suporte de TI para minha empresa.'
  }
};
const serviceDialog = document.querySelector('.service-dialog');
if (serviceDialog) {
  const dialogTitle = serviceDialog.querySelector('#service-dialog-title');
  const dialogDescription = serviceDialog.querySelector('.service-dialog-description');
  const dialogList = serviceDialog.querySelector('.service-dialog-list');
  const dialogCta = serviceDialog.querySelector('.service-dialog-cta');
  const closeDialog = serviceDialog.querySelector('.service-dialog-close');
  document.querySelectorAll('[data-service]').forEach((card) => {
    card.addEventListener('click', () => {
      const details = serviceDetails[card.dataset.service];
      if (!details) return;
      dialogTitle.textContent = details.title;
      dialogDescription.textContent = details.description;
      dialogList.replaceChildren(...details.items.map((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        return li;
      }));
      dialogCta.href = `https://wa.me/5551991135927?text=${encodeURIComponent(details.message)}`;
      dialogCta.setAttribute('aria-label', `Solicitar ${details.title} pelo WhatsApp`);
      if (typeof serviceDialog.showModal === 'function') serviceDialog.showModal();
      else serviceDialog.setAttribute('open', '');
      closeDialog.focus();
    });
  });
  closeDialog.addEventListener('click', () => serviceDialog.close ? serviceDialog.close() : serviceDialog.removeAttribute('open'));
  serviceDialog.addEventListener('click', (event) => {
    if (event.target === serviceDialog) serviceDialog.close ? serviceDialog.close() : serviceDialog.removeAttribute('open');
  });
  serviceDialog.addEventListener('close', () => {
    const activeCard = document.querySelector(`[data-service][data-last-open="true"]`);
    if (activeCard) activeCard.focus();
  });
  document.querySelectorAll('[data-service]').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll('[data-service]').forEach((item) => item.removeAttribute('data-last-open'));
      card.setAttribute('data-last-open', 'true');
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && serviceDialog.open) serviceDialog.close();
  });
}

// Diferenciais da seção “Sobre a LUMEM”: animação suave ao entrar na área visível.
(() => {
  const trustPoints = document.querySelector('.trust-points');
  if (!trustPoints) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    trustPoints.classList.add('is-visible');
    return;
  }
  trustPoints.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        trustPoints.classList.add('is-visible');
        observer.disconnect();
      }
    });
  }, { threshold: 0.18 });
  observer.observe(trustPoints);
})();
