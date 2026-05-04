-- MÓDULO DE MORTALIDADE --
Resumo das regras de negócio para esse módulo:

✅ Animal deve existir e pertencer à fazenda
✅ Animal com status "dead" não pode ter nova mortality
✅ Animal com status "sold" não pode ter mortality
✅ Ao registrar: animal muda para status "dead"
✅ Ao registrar: animal é removido do pasto (pasture.disconnect)
✅ Ao registrar: pasto decrementa currentAnimals
✅ Ao registrar: prenhezes ativas do animal são encerradas como "failed"
✅ deathDate obrigatória e não pode ser futura
✅ deathTime opcional, formato HH:MM
✅ Fotos são URLs externas (Cloudinary gerenciado pelo cliente)
✅ addPhotos faz append — não substitui fotos existentes
✅ Limite de 10 fotos por registro
✅ birthId opcional — vincula parto (natimorto)
✅ Atualização não reverte status do animal
