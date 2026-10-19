# LUMEM Soluções em TI — pacote para GitHub Pages

## Alterações desta versão
- Atendimento presencial identificado como **Cachoeirinha – RS**.
- Região de cobertura descrita como **Região Metropolitana de Porto Alegre**.
- Atendimento remoto descrito como **Brasil e exterior**.
- Título SEO, descrição e metadados de compartilhamento atualizados para reforçar a marca e a localização.
- Dados estruturados e arquivos de rastreamento mantidos.
- Logo oficial, imagens, layout, estilos e scripts preservados.

## Publicar no GitHub
1. Faça backup da versão atual do repositório.
2. Extraia este ZIP.
3. Abra o repositório `LumemTI/lumem-site`.
4. Envie o conteúdo de dentro da pasta `lumem-site-main` para a raiz do repositório, substituindo os arquivos correspondentes. Não envie a pasta externa como subpasta.
5. Preserve `CNAME`, `index.html`, `style.css`, `script.js`, `robots.txt`, `sitemap.xml` e a pasta `assets`.
6. Faça o commit com a mensagem `Atualiza SEO e localização da LUMEM`.
7. Aguarde o GitHub Actions/GitHub Pages concluir e confira `https://lumemti.com.br/`.

## Git pela linha de comando
Execute dentro da pasta local do repositório depois de copiar os arquivos revisados e conferir as mudanças:

```bash
git status
git add index.html SEO-REVISAO-OUT-2026.md PUBLICAR-NO-GITHUB.md
git commit -m "Atualiza SEO e localização da LUMEM"
git push
```

Não adicione arquivos `.env`, tokens, senhas ou credenciais ao repositório.
