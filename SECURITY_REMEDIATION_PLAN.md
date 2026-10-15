# Plano de saneamento do histórico Git — apiInventory

> Plano não destrutivo. Este arquivo não contém valores de credenciais. Atualizado em 15/10/2026.

## Situação atual verificada

O arquivo .env foi retirado da árvore atual. Foi publicamente rastreado no passado.

## Próxima ação fora do GitHub

Rotacione a senha MySQL se ainda for válida.

## Preservação do código

1. Faça uma cópia local do repositório e um backup completo via `git bundle create backup-repositorio.bundle --all` em local **privado**; nunca envie esse backup para um repositório público.
2. Documente o estado e os commits atuais antes de modificar o histórico.
3. Localize as versões antigas de .env e retire esse caminho do histórico com git-filter-repo, após backup offline.
4. Inspecione o novo histórico e compare todos os arquivos importantes, garantindo que não houve perda de código.
5. Faça testes locais e somente então coordene a publicação do novo histórico, ciente de que hashes de commits e clones antigos mudarão.
6. Revogue os valores antigos; mesmo após limpar Git, segredos previamente expostos não devem ser reutilizados.

## Recuperação futura

- Modelo de configuração: [`.env.example`](.env.example).
- Registro de alterações anteriores: [`SECURITY_CHANGELOG.md`](SECURITY_CHANGELOG.md).
- Recuperar apenas código-fonte e configurações não sigilosas dos backups locais, **nunca** credenciais antigas.
- Não restaurar qualquer segredo antigo.

## Controle desta etapa

- **Arquivos originais excluídos nesta etapa:** nenhum.
- **Código-fonte alterado nesta etapa:** nenhum.
- **Histórico reescrito nesta etapa:** não.
- **Novo documento:** `SECURITY_REMEDIATION_PLAN.md`.
