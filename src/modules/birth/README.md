-- MODULO DE PARTO --
Resumo das regras de negócio feita para esse módulo:

✅ Só fêmeas ativas podem ter parto registrado
✅ Parto pode ser vinculado a uma tentativa (attemptId) ou avulso
✅ Tentativa vinculada deve pertencer à mesma mãe e fazenda
✅ Ao registrar parto com attemptId → tentativa vai para success e prenhez é encerrada
✅ Parto avulso (sem attemptId) também é permitido
✅ Bezerro nascido morto (situation: dead) → cria Mortality automaticamente com origin: "natimorto"
✅ registerCalfAsAnimal: true + situation: normal → cria Animal automaticamente (origin: "born")
✅ Bezerro criado como animal herda pasto e raça da mãe
✅ Chip do bezerro obrigatório para registrá-lo como animal
✅ Chip do bezerro não pode já existir no sistema
✅ Não é possível registrar como animal um bezerro nascido morto
✅ Parto com bezerro registrado (calfStatus: complete) não pode ser excluído
✅ Veterinário vinculado deve pertencer à fazenda
