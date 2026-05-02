
Resumo das regras de negócio feita para esse módulo:

✅ Só fêmeas ativas podem ter prenhez
✅ Não pode ter duas prenhezes em andamento
✅ Não pode nova cobertura se já tiver tentativa em andamento
✅ Touro validado na fazenda (para MONTA)
✅ Número da tentativa auto-incrementado
✅ Data parto estimada auto-calculada (+283 dias)
✅ Ultrassom PREGNANT → status = pregnant
✅ Ultrassom VIABLE → tentativa = success, prenhez = pregnant
✅ Ultrassom EMPTY/ABSORPTION dentro período fértil → nova tentativa
✅ Ultrassom EMPTY/ABSORPTION fora período fértil → encerra prenhez
✅ Não permite ultrassom duplicado (mesmo número de dias)
